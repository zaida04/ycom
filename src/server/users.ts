import { z } from 'zod';
import { procedure, protectedProcedure, router } from './trpc';
import "@/db/mongoose";
import User from "@/db/User";
import bcrypt from "bcryptjs";
import { generateHashedValue } from '@/lib/hash';
import Session from '@/db/Session';
import { TRPCError } from '@trpc/server';
import Post from '@/db/Post';

export const userRouter = router({
    register: procedure
        .input(
            z.object({
                name: z.string().min(2).max(30),
                email: z.string().email().min(2).max(50),
                username: z.string().min(2).max(30),
                password: z.string().min(3).max(30),
                confirmPassword: z.string().min(3).max(30),
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
            const hashedPassword = generateHashedValue(password + salt);
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
                username: z.string().min(2).max(30),
                password: z.string().min(3).max(30),
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
                    _id: user!._id,
                    name: user!.name,
                    email: user!.email,
                    username: user!.username,
                }
            };
        }),
    search: procedure
        .input(
            z.object({
                username: z.string().min(1).max(30),
            }),
        )
        .query(async (opts) => {
            const { username } = opts.input;
            const users = await User.find({ username: { $regex: username, $options: 'i' } });

            return {
                results: users.map(user => ({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                }))
            };
        }),
    getUser: procedure
        .input(z.string())
        .query(async (opts) => {
            const user = await User.findById(opts.input);
            if (!user) {
                throw new Error('User not found');
            }
            const posts = await Post.find({ author_id: user._id }, null, { sort: { created_at: -1 } });

            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                posts
            };
        }),
    getCurrentUser: protectedProcedure
        .query(async (opts) => {
            if (!opts.ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
            const user = opts.ctx.user;

            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
            };
        }),
    updateProfile: protectedProcedure
        .input(
            z.object({
                name: z.string().min(2).max(30).optional(),
                email: z.string().email().min(2).max(50).optional(),
                username: z.string().min(2).max(30).optional(),
                password: z.string().min(3).max(30).optional(),
                confirmPassword: z.string().min(3).max(30).optional(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { name, email, username, password, confirmPassword } = input;
            if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });

            if ((password || confirmPassword) && (password !== confirmPassword))
                throw new TRPCError({ code: 'BAD_REQUEST', message: 'Passwords do not match' });

            const user = await User.findById(ctx.user._id);
            if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' });

            const existing = await User.findOne({ $or: [{ email }, { username }], _id: { $ne: user._id } });
            if (existing) throw new TRPCError({ code: 'CONFLICT', message: 'Email or username already in use' });

            if (password && confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                user.password = generateHashedValue(password + salt);
                user.salt = salt;
            }

            if (name) user.name = name;
            if (email) user.email = email;
            if (username) user.username = username;
            await user.save();

            return { success: true, message: "Profile updated successfully" };
        }),
});

export type UserRouter = typeof userRouter;
