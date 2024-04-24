import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const no_refetch = {
  "refetchOnMount": true,
  "refetchOnReconnect": false,
  "refetchOnWindowFocus": false,
  "refetchInterval": false,
  "refetchIntervalInBackground": false,
} as const