import { configs } from "./_testConfigs";
import { randomUUID } from "crypto";
import { StoreDatasetCategorisationKey } from "./types/DatasetCategorisationKey";

describe.each(configs)(
    "$name DatasetCategorisationKey Storage Tests",
    ({ config }) => {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        let testClient: any;
        beforeAll(async () => {
            testClient = await config.beforeAllSetup();
        });
        afterAll(async () => {
            await config.afterAllTeardown(testClient);
        });
        test("Happy Path :: Creates, Reads, Deletes", async () => {
            const startRes = await config.storage.datasetCategorisationKey
                .readCategorisationKey([randomUUID()], testClient);
            expect(startRes._unsafeUnwrap()).toEqual([]);
            const fakeKey: Parameters<StoreDatasetCategorisationKey>[0] = {
                label: randomUUID(),
                dataset_id: randomUUID()
            };

            const storedIdRes = await config.storage.datasetCategorisationKey
                .storeCategorisationKey(fakeKey, testClient);
            expect(storedIdRes.isOk()).toBeTruthy();
            const storedId = storedIdRes._unsafeUnwrap();
            const storedRes = await config.storage.datasetCategorisationKey
                .readCategorisationKey([storedId], testClient);
            expect(storedRes.isOk()).toBeTruthy();
            const stored = storedRes._unsafeUnwrap();
            expect(stored).toEqual([{ id: storedId, ...fakeKey}]);

            expect((
                await config.storage.datasetCategorisationKey
                    // eslint-disable-next-line max-len
                    .deleteCategorisationKey(stored[0].dataset_id, stored[0].id ,testClient)
            ).isOk()).toBeTruthy();

            const endRes = await config.storage.datasetCategorisationKey
                .readCategorisationKey([storedId], testClient);
            expect(endRes._unsafeUnwrap()).toEqual([]);
        });
    }
);
