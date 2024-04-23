import { z } from 'zod';
import { procedure, protectedProcedure, router } from './trpc';
import "@/lib/mongoose";
import User from "@/db/User";
import bcrypt from "bcryptjs";
import { generateHashedValue } from '@/lib/hash';
import Session from '@/db/Session';
import Post from '@/db/Post';
import { TRPCError } from '@trpc/server';

export const appRouter = router({
    register: procedure
        .input(
            z.object({
                name: z.string()
                    .min(2)
                    .max(30),
                email: z.string()
                    .email(),
                username: z.string()
                    .min(2)
                    .max(30),
                password: z.string()
                    .min(3)
                    .max(30),
                confirmPassword: z.string()
                    .min(3)
                    .max(30),
            }),
        )
        .mutation(async (opts) => {
            const { name, email, username, password, confirmPassword } = opts.input;

            const existing = await User.findOne({ $or: [{ username }, { email }] });
            if (existing) {
                throw new Error('User already exists');
            }

            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = generateHashedValue(password + salt)
            const created = await User.create({
                name,
                email,
                username,
                password: hashedPassword,
                salt
            });

            const hashUserId = generateHashedValue(`${created._id}${Date.now()}`);
            await Session.create({
                user_id: created._id,
                token: hashUserId
            });
            (opts.ctx as any).res.setHeader('Set-Cookie', `token=${hashUserId}; Path=/; HttpOnly`);

            return { success: true };
        }),
    login: procedure
        .input(
            z.object({
                username: z.string()
                    .min(2)
                    .max(30),
                password: z.string()
                    .min(3)
                    .max(30),
            }),
        )
        .mutation(async (opts) => {
            const { username, password } = opts.input;

            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('User does not exist');
            }

            const hashedInputPassword = generateHashedValue(password + user.salt);
            if (user.password !== hashedInputPassword) {
                throw new Error('Incorrect password');
            }

            const hashUserId = generateHashedValue(`${user._id}${Date.now()}`);
            await Session.create({
                user_id: user._id,
                token: hashUserId
            });

            (opts.ctx as any).res.setHeader('Set-Cookie', `token=${hashUserId}; Path=/; HttpOnly`);

            return { success: true };
        }),
    logout: procedure
        .mutation(async (opts) => {
            const token = (opts.ctx as any).req.cookies.token;
            if (!token) {
                throw new Error('No token');
            }

            await Session.deleteOne({ token });
            (opts.ctx as any).res.setHeader('Set-Cookie', `token=; Path=/; HttpOnly`);

            return { success: true };
        }),
    isLogged: procedure
        .query(async (opts) => {
            const token = (opts.ctx as any).req.cookies.token;
            if (!token) {
                return { logged: false, user: null };
            }

            const session = await Session.findOne({ token });
            if (!session) {
                return { logged: false, user: null };
            }
            const user = await User.findById(session.user_id);

            return {
                logged: true,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                }
            };
        }),
    createPost: protectedProcedure
        .input(
            z.object({
                title: z.string()
                    .min(2)
                    .max(100),
                content: z.string()
                    .min(2)
                    .max(1000),
            }),
        )
        .mutation(async (opts) => {
            if (!opts.ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });

            const { title, content } = opts.input;
            await Post.create({
                title,
                content,
                author_id: opts.ctx.user._id
            });

            return { success: true };
        }),
});

export type AppRouter = typeof appRouter;