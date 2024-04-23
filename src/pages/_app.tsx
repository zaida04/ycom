import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import { trpc } from '@/lib/trpc';
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Y.com | X, but better</title>
    </Head>
    <HydrationOverlay>
      <TooltipProvider>
        <div className={inter.className}>
          <Component {...pageProps} />
        </div>
      </TooltipProvider>
    </HydrationOverlay>
  </>
}

export default trpc.withTRPC(App);