import { configs } from "./_testConfigs";
import { randomUUID } from "crypto";
import { isNotFoundError } from "./types/StorageErrors";
import { StoreDataset } from "./types/Dataset";

describe.each(configs)(
    "$name Dataset Storage Tests",
    ({ config }) => {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        let testClient: any;
        beforeAll(async () => {
            testClient = await config.beforeAllSetup();
        });
        afterAll(async () => {
            await config.afterAllTeardown(testClient);
        });
        test("Happy Path :: Creates, Reads, Updates, Deletes", async () => {
            const startRes = await config.storage.dataset
                .readDataset([randomUUID()], testClient);
            expect(startRes._unsafeUnwrap()).toEqual([]);
            const datasetInsert: Parameters<StoreDataset>[0] = {
                name: "SomeDatasetName",
                item_type_keys: [{
                    index: 0,
                    value: randomUUID()
                },{
                    index: 1,
                    value: randomUUID()
                }],
                item_labels: [{
                    index: 0,
                    value: randomUUID()
                },{
                    index: 1,
                    value: randomUUID()
                }]
            };

            const storedIdRes = await config.storage.dataset
                .storeDataset(datasetInsert, testClient);
            expect(storedIdRes.isOk()).toBeTruthy();
            const storedId = storedIdRes._unsafeUnwrap();
            const storedRes = await config.storage.dataset
                .readDataset([storedId], testClient);
            expect(storedRes.isOk()).toBeTruthy();
            const stored = storedRes._unsafeUnwrap();
            expect(stored).toEqual([{ id: storedId, ...datasetInsert}]);

            const updatedName = "Updated Dataset Name";
            //eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { name, ...untouched } = datasetInsert;
            const res = await config.storage.dataset.updateDataset(storedId, {
                name: updatedName
            }, testClient);

            expect(res.isOk()).toBeTruthy();

            const storedUpdatedRes = await config.storage.dataset
                .readDataset([storedId], testClient);
            expect(storedUpdatedRes.isOk()).toBeTruthy();
            const updated = storedUpdatedRes._unsafeUnwrap();
            expect(updated).toEqual([{ 
                id: storedId, 
                name: updatedName, 
                ...untouched
            }]);

            expect((
                await config.storage.dataset
                    .deleteDataset(stored[0].id, testClient)
            ).isOk()).toBeTruthy();

            const endRes = await config.storage.dataset
                .readDataset([storedId], testClient);
            expect(endRes._unsafeUnwrap()).toEqual([]);
        });
    }
);
