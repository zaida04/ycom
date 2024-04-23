import { z } from 'zod';
import { procedure, protectedProcedure, router } from './trpc';
import "@/lib/mongoose";
import Post, { IPost } from "@/db/Post";
import { TRPCError } from '@trpc/server';
import EventEmitter from 'events';
import { observable } from '@trpc/server/observable';

const emitter = new EventEmitter();

export const postRouter = router({
    createPost: protectedProcedure
        .input(
            z.object({
                title: z.string().min(2).max(100),
                content: z.string().min(2).max(1000),
            }),
        )
        .mutation(async (opts) => {
            if (!opts.ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });

            const { title, content } = opts.input;
            const created = await Post.create({
                title,
                content,
                author_id: opts.ctx.user._id
            });
            emitter.emit('newPost', created);

            return { success: true };
        }),
    getPosts: procedure
        .query(async () => {
            const posts = await Post.find().sort({ createdAt: -1 });
            return posts;
        }),
    postSubscription: procedure
        .subscription(() => {
            console.log("SUB")

            return observable<{ post: IPost }>((observer) => {
                const emitPost = (post: IPost) => {
                    console.log("NEW");
                    observer.next({ post });
                }

                emitter.on('newPost', emitPost);
                return () => {
                    emitter.off('newPost', emitPost);
                }
            });
        }),
    likePost: protectedProcedure
        .input(z.string())
        .mutation(async (opts) => {
            if (!opts.ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
            const userId = opts.ctx.user._id;

            const post = await Post.findById(opts.input);
            if (!post) throw new TRPCError({ code: 'NOT_FOUND' });

            let liked = false;
            if (post.likes.some((id) => id.equals(userId))) {
                post.likes = post.likes.filter((id) => !id.equals(userId));
            } else {
                post.likes.push(opts.ctx.user._id);
                liked = true;
            }

            await post.save();
            return { liked };
        }),
});

export type PostRouter = typeof postRouter;
