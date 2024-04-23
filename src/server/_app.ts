import { userRouter } from './users';
import { postRouter } from './posts';
import { router } from './trpc';

export const appRouter = router({
    user: userRouter,
    post: postRouter,
});

export type AppRouter = typeof appRouter;
