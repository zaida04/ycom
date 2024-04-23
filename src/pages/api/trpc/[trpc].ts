import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '@/server/_app';
import { serialize } from 'cookie';


export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: ({ req, res }) => {
        return { req, res }
    },
});