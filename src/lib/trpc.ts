import { TRPCClientError, createWSClient, httpBatchLink, wsLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@/server/_app';
import { apiUrl } from '@/env';

function getBaseUrl() {
    if (typeof window !== 'undefined')
        return '';

    return apiUrl;
}

export const trpc = createTRPCNext<AppRouter>({
    config(opts) {
        return {
            links: [
                httpBatchLink({
                    url: `${getBaseUrl()}/api/trpc`,
                })
            ],
        };
    },
    ssr: false,
});

export type TRPCClientErr = TRPCClientError<AppRouter>;