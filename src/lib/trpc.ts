import { TRPCClientError, createWSClient, httpBatchLink, wsLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@/server/_app';

function getBaseUrl() {
    if (typeof window !== 'undefined')
        return '';

    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
    config(opts) {
        return {
            links: [
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                }),
                wsLink({
                    client: createWSClient({
                        url: `${getBaseUrl().replace('http', 'ws')}/api/trpc`,
                    }),
                })
            ],
        };
    },
    ssr: false,
});

export type TRPCClientErr = TRPCClientError<AppRouter>;