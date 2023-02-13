import { configs } from "./_testConfigs";
import { isValidationError } from "./types/StorageErrors";
import { StoreDatasetAdminKey } from "./types/DatasetAdminKey";
import { randomUUID } from "crypto";

describe.each(configs)(
    "$name DatasetAdminKey Non-Integration Storage Tests",
    ({ config }) => {
        const badKeys = [
            [{
                dataset_id: "",
                hashed_admin_secret: "",
                admin_secret_salt: ""
            },{
                dataset_id: "",
                hashed_admin_secret: randomUUID(),
                admin_secret_salt: randomUUID()
            },{
                dataset_id: randomUUID(),
                hashed_admin_secret: "",
                admin_secret_salt: randomUUID()
            },{
                dataset_id: randomUUID(),
                hashed_admin_secret: randomUUID(),
                admin_secret_salt: ""
            },{
                dataset_id: undefined,
                hashed_admin_secret: undefined,
                admin_secret_salt: undefined
            }]
        ];

        test.each(badKeys)("Rejects bad storage keys", async (badKey) => {
            const res = await config.storage.datasetAdminKey
                .storeAdminKey(badKey as Parameters<StoreDatasetAdminKey>[0]);
            expect(res.isErr()).toBeTruthy();
            expect(isValidationError(res._unsafeUnwrapErr())).toBeTruthy();
        });
    });