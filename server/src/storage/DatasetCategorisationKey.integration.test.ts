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


            const fakeKeyTwo: Parameters<StoreDatasetCategorisationKey>[0] = {
                label: randomUUID(),
                dataset_id: fakeKey.dataset_id
            };

            const storedIdResTwo = await config.storage.datasetCategorisationKey
                .storeCategorisationKey(fakeKeyTwo, testClient);
            expect(storedIdResTwo.isOk()).toBeTruthy();
            const storedIdTwo = storedIdResTwo._unsafeUnwrap();

            const getAllRes = await config.storage.datasetCategorisationKey
                .readCategorisationKeysForDataset(
                    [fakeKey.dataset_id], testClient
                );
            
            expect(getAllRes.isOk()).toBeTruthy();
            const getAll = getAllRes._unsafeUnwrap();

            expect(getAll.map(x => x.id)).toEqual([storedId, storedIdTwo]);

            expect((
                await config.storage.datasetCategorisationKey
                    // eslint-disable-next-line max-len
                    .deleteCategorisationKey(stored[0].dataset_id, stored[0].id ,testClient)
            ).isOk()).toBeTruthy();

            const endRes = await config.storage.datasetCategorisationKey
                .readCategorisationKey([storedId], testClient);
            expect(endRes._unsafeUnwrap()).toEqual([]);

            expect((
                await config.storage.datasetCategorisationKey
                    // eslint-disable-next-line max-len
                    .deleteCategorisationKey(stored[0].dataset_id, storedIdTwo ,testClient)
            ).isOk()).toBeTruthy();


            const getAllEmptyRes = await config.storage.datasetCategorisationKey
                .readCategorisationKeysForDataset(
                    [fakeKey.dataset_id], testClient
                );
            
            expect(getAllEmptyRes.isOk()).toBeTruthy();
            expect(getAllEmptyRes._unsafeUnwrap()).toEqual([]);
        });
    }
);
