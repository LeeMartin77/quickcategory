import { configs } from "./_testConfigs";
import { isValidationError } from "./types/StorageErrors";
import { randomUUID } from "crypto";
import { StoreDatasetCategorisationKey } from "./types/DatasetCategorisationKey";

describe.each(configs)(
    "$name DatasetAdminKey Non-Integration Storage Tests",
    ({ config }) => {
        const badKeys = [
            [{
                dataset_id: "",
                label: "",
            },{
                dataset_id: "",
                label: randomUUID(),
            },{
                dataset_id: randomUUID(),
                label: "",
            },{
                dataset_id: undefined,
                label: undefined
            }]
        ];

        test.each(badKeys)("Rejects bad storage keys", async (badKey) => {
            const res = await config.storage.datasetCategorisationKey
            //eslint-disable-next-line max-len
                .storeCategorisationKey(badKey as Parameters<StoreDatasetCategorisationKey>[0]);
            expect(res.isErr()).toBeTruthy();
            expect(isValidationError(res._unsafeUnwrapErr())).toBeTruthy();
        });
    });