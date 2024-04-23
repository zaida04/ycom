import { createHash } from "node:crypto";

export function generateHashedValue(input: string): string {
    return createHash("sha256").update(input).digest("hex");
}