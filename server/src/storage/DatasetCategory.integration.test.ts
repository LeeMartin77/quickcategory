import { configs } from "./_testConfigs";
import { randomUUID } from "crypto";
import { StoreDatasetCategory } from "./types/DatasetCategory";

describe.each(configs)(
    "$name DatasetCategory Storage Tests",
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
            const startRes = await config.storage.datasetCategory
                .readCategories([datasetId], testClient);
            expect(startRes.isOk()).toBeTruthy();
            expect(startRes._unsafeUnwrap()).toEqual([]);
            const categories: Parameters<StoreDatasetCategory>[0][] = [
                {
                    dataset_id: datasetId,
                    key: randomUUID(),
                    name: randomUUID()
                },
                {
                    dataset_id: datasetId,
                    key: randomUUID(),
                    name: randomUUID()
                }
            ];

            const storedRes = await Promise.all(
                categories.map(cat => 
                    config.storage.datasetCategory
                        .storeCategory(cat, testClient)
                )
            );

            expect(storedRes.every(x => x.isOk())).toBeTruthy();
            
            
            const retRes = await config.storage.datasetCategory
                .readCategories([datasetId], testClient);
            expect(retRes.isOk()).toBeTruthy();
            expect(retRes._unsafeUnwrap()).toEqual(categories);

            const delRes = await Promise.all(
                categories.map(cat => 
                    config.storage.datasetCategory
                        .deleteCategory(cat.dataset_id, cat.key, testClient)
                )
            );

            expect(delRes.every(x => x.isOk())).toBeTruthy();
            
            const endRes = await config.storage.datasetCategory
                .readCategories([datasetId], testClient);
            expect(endRes.isOk()).toBeTruthy();
            expect(endRes._unsafeUnwrap()).toEqual([]);
        });
    }
);
