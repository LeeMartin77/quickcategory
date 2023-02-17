import { configs } from "./_testConfigs";
import { randomUUID } from "crypto";
import { StoreDatasetItems } from "./types/DatasetItem";

describe.each(configs)(
    "$name DatasetItem Storage Tests",
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
            const datasetId = randomUUID();
            const startRes = await config.storage.datasetItem
                .readItems([datasetId], testClient);
            expect(startRes.isOk()).toBeTruthy();
            expect(startRes._unsafeUnwrap()).toEqual([]);
            const items: Parameters<StoreDatasetItems>[0] = [
                {
                    dataset_id: datasetId,
                    values: [{ index: 0, value: randomUUID()}]
                },
                {
                    dataset_id: datasetId,
                    values: [{ index: 0, value: randomUUID()}]
                }
            ];

            const storedRes = await config.storage.datasetItem
                .storeItems(items, testClient);

            expect(storedRes.isOk()).toBeTruthy();
            
            const stored = storedRes._unsafeUnwrap();

            expect(stored.map(x => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { id, ...ret } = x;
                return ret;
            })).toEqual(items);
            
            const retRes = await config.storage.datasetItem
                .readItems([datasetId], testClient);
            expect(retRes.isOk()).toBeTruthy();
            expect(retRes._unsafeUnwrap()).toEqual(stored);

            const delRes = await Promise.all(
                stored.map(s => 
                    config.storage.datasetItem
                        .deleteItem(s.dataset_id, s.id, testClient)
                )
            );

            expect(delRes.every(x => x.isOk())).toBeTruthy();
            
            const endRes = await config.storage.datasetItem
                .readItems([datasetId], testClient);
            expect(endRes.isOk()).toBeTruthy();
            expect(endRes._unsafeUnwrap()).toEqual([]);
        });
        test("Excludes provided IDs", async () => {
            const datasetId = randomUUID();
            const startRes = await config.storage.datasetItem
                .readItems([datasetId], testClient);
            expect(startRes.isOk()).toBeTruthy();
            expect(startRes._unsafeUnwrap()).toEqual([]);
            const items: Parameters<StoreDatasetItems>[0] = [
                {
                    dataset_id: datasetId,
                    values: [{ index: 0, value: randomUUID()}]
                },
                {
                    dataset_id: datasetId,
                    values: [{ index: 0, value: randomUUID()}]
                }
            ];

            const storedRes = await config.storage.datasetItem
                .storeItems(items, testClient);

            expect(storedRes.isOk()).toBeTruthy();
            
            const stored = storedRes._unsafeUnwrap();

            expect(stored.map(x => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { id, ...ret } = x;
                return ret;
            })).toEqual(items);
            
            const retRes = await config.storage.datasetItem
                .readItemsExcept([datasetId], [stored[0].id], testClient);
            expect(retRes.isOk()).toBeTruthy();
            expect(retRes._unsafeUnwrap()).toEqual([stored[1]]);
        });
    }
);
