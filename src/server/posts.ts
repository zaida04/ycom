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
});

export type PostRouter = typeof postRouter;
