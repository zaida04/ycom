import { z } from 'zod';
import { procedure, router } from './trpc';
import "@/lib/mongoose";
import User from "@/db/User";
import bcrypt from "bcryptjs";
import { generateHashedValue } from '@/lib/hash';

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
                    .min(6)
                    .max(30),
                confirmPassword: z.string()
                    .min(6)
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

            await User.create({
                name,
                email,
                username,
                password: hashedPassword,
                salt
            })

            return { success: true };
        })
});

export type AppRouter = typeof appRouter;