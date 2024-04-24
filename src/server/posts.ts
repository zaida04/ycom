import { z } from 'zod';
import { procedure, protectedProcedure, router } from './trpc';
import "@/db/mongoose";
import Post from "@/db/Post";
import { TRPCError } from '@trpc/server';
import { wsApiUrl } from '@/env';

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

            try {
                console.log('Broadcasting newPost', created);
                const req = await fetch(wsApiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        event: 'newPost',
                        message: created,
                    }),
                });
                const res = await req.json();
                console.log('Broadcasted newPost');
            } catch (e) {
                console.error(e);
            }

            return { success: true };
        }),
    getPosts: procedure
        .query(async () => {
            const posts = await Post.find().sort({ createdAt: -1 });
            return posts;
        }),
    getPost: procedure
        .input(z.string())
        .query(async (opts) => {
            const post = await Post.findById(opts.input);
            if (!post) throw new TRPCError({ code: 'NOT_FOUND' });
            return post;
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
    deletePost: protectedProcedure
        .input(z.string())
        .mutation(async (opts) => {
            if (!opts.ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });

            const post = await Post.findById(opts.input);
            if (!post) throw new TRPCError({ code: 'NOT_FOUND' });

            if (!post.author_id.equals(opts.ctx.user._id)) throw new TRPCError({ code: 'FORBIDDEN' });

            await post.deleteOne();
            return { success: true };
        }),
});

export type PostRouter = typeof postRouter;
