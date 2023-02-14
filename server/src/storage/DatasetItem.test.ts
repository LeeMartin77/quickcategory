import { configs } from "./_testConfigs";
import { isValidationError } from "./types/StorageErrors";
import { StoreDatasetItems } from "./types/DatasetItem";

describe.each(configs)(
    "$name DatasetItem Non-Integration Storage Tests",
    ({ config }) => {
        const badCats = [
            [[{
                values: [{value: "something", index: 0}],
                dataset_id: ""
            }]],
        ];

        test.each(badCats)("Rejects bad storage keys", async (badCat) => {
            const res = await config.storage.datasetItem
            //eslint-disable-next-line max-len
                .storeItems(badCat as Parameters<StoreDatasetItems>[0]);
            expect(res.isErr()).toBeTruthy();
            expect(isValidationError(res._unsafeUnwrapErr())).toBeTruthy();
        });
    });