import { configs } from "./_testConfigs";
import { isValidationError } from "./types/StorageErrors";
import { randomUUID } from "crypto";
import { StoreDatasetCategory } from "./types/DatasetCategory";

describe.each(configs)(
    "$name DatasetAdminKey Non-Integration Storage Tests",
    ({ config }) => {
        const badCats = [
            [{
                key: "",
                dataset_id: "",
                name: ""
            }],
            [{
                key: randomUUID(),
                dataset_id: randomUUID(),
                name: ""
            }],
            [{
                key: randomUUID(),
                dataset_id: "",
                name: randomUUID()
            }],
            [{
                key: "",
                dataset_id: randomUUID(),
                name: randomUUID()
            }],
        ];

        test.each(badCats)("Rejects bad storage keys", async (badCat) => {
            const res = await config.storage.datasetCategory
            //eslint-disable-next-line max-len
                .storeCategory(badCat as Parameters<StoreDatasetCategory>[0]);
            expect(res.isErr()).toBeTruthy();
            expect(isValidationError(res._unsafeUnwrapErr())).toBeTruthy();
        });
    });