import { z } from 'zod';
import { procedure, router } from './trpc';

export const appRouter = router({
    register: procedure
        .input(
            z.object({
                name: z.string(),
                email: z.string().email(),
                username: z.string(),
                password: z.string(),
                confirmPassword: z.string(),
            }),
        )
        .mutation(async (opts) => {
            const { name, email, username, password, confirmPassword } = opts.input;

            if (password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }


        })
});

export type AppRouter = typeof appRouter;