import { createHash, randomUUID } from "node:crypto";
import { hashWithSalt } from ".";

describe("Hash with Salt", () => {
    test("Hashes with salt as expected", () => {
        const secret = randomUUID();
        const salt = randomUUID();
        const expected = createHash("sha3-256").update(secret + salt).digest("base64");
        expect(hashWithSalt(secret, salt)).toBe(expected);
    });
});