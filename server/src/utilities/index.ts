import { createHash } from "node:crypto";

export const hashWithSalt = (secret: string, salt: string): string  => {
    return createHash("sha3-256").update(secret + salt).digest("base64");
};