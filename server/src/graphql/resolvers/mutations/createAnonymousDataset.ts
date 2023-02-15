import { GQLContext, MutationCreateAnonymousDatasetArgs } from "../../types";
import { createHash, randomBytes } from "node:crypto";

function randomStringOfLength(length: number): string {
    return randomBytes(Math.ceil(length * 3 / 4))
        .toString("base64")
        .slice(0, length)
        .replace(/\+/g, "0")
        .replace(/\//g, "0");
}

export const createAnonymousDataset = 
    // eslint-disable-next-line max-len
    async (_: object, { name, itemLabels, itemTypeKeys }: MutationCreateAnonymousDatasetArgs, context: GQLContext) => {
        const storageRes = await context.dataSources
            .storage.storage.dataset.storeDataset({
                name,
                item_type_keys: itemTypeKeys
                    .map((value, index) => ({ index, value })),
                item_labels: itemLabels
                    .map((value, index) => ({ index, value }))
            });
        if (storageRes.isErr()) {
            throw storageRes.error;
        }

        const secret = randomStringOfLength(20);
        const salt = randomStringOfLength(10);

        const hash = createHash("sha3-256").update(secret + salt).digest("base64");

        const adminKeyRes = await context.dataSources
            .storage.storage.datasetAdminKey.storeAdminKey({
                dataset_id: storageRes.value,
                hashed_admin_secret: hash,
                admin_secret_salt: salt
            });

        if (adminKeyRes.isErr()) {
            throw adminKeyRes.error;
        }
        
        return {
            accessId: adminKeyRes.value,
            accessSecret: secret,
            id: storageRes.value
        };
    };