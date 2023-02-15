import { configs } from "./_testConfigs";
import { randomUUID } from "crypto";
import { StoreDatasetItemCategorisation } from "./types/DatasetItemCategorisation";

describe.each(configs)(
    "$name DatasetItemCategory Storage Tests",
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
            const startRes = await config.storage.datasetItemCategorisation
                .readCategorisations(datasetId, undefined, testClient);
            expect(startRes.isOk()).toBeTruthy();
            expect(startRes._unsafeUnwrap()).toEqual([]);
            // eslint-disable-next-line max-len
            const itemCategorisation: Parameters<StoreDatasetItemCategorisation>[0] = 
                {
                    dataset_id: datasetId,
                    key_id: randomUUID(),
                    item_id: randomUUID(),
                    category_key: randomUUID()
                }
            ;

            const storedRes = await config.storage.datasetItemCategorisation
                .storeCategorisation(itemCategorisation, testClient);
                
            

            expect(storedRes.isOk()).toBeTruthy();

            const storedId = storedRes._unsafeUnwrap();
            
            
            const retRes = await config.storage.datasetItemCategorisation
                .readCategorisations(datasetId, undefined, testClient);
            expect(retRes.isOk()).toBeTruthy();
            expect(retRes._unsafeUnwrap())
                .toEqual([{ id: storedId, ...itemCategorisation}]);

            const delRes = await config.storage.datasetItemCategorisation
                .deleteCategorisation(datasetId, storedId, testClient);
       

            expect(delRes.isOk()).toBeTruthy();
            
            const endRes = await config.storage.datasetItemCategorisation
                .readCategorisations(datasetId, undefined, testClient);
            expect(endRes.isOk()).toBeTruthy();
            expect(endRes._unsafeUnwrap()).toEqual([]);
        });
        test("Filtering :: Filters Queries Correctly", async () => {
            const datasetId = randomUUID();
            const startRes = await config.storage.datasetItemCategorisation
                .readCategorisations(datasetId, undefined, testClient);
            expect(startRes.isOk()).toBeTruthy();
            expect(startRes._unsafeUnwrap()).toEqual([]);
            // eslint-disable-next-line max-len
            const specificKey: Parameters<StoreDatasetItemCategorisation>[0] = 
                {
                    dataset_id: datasetId,
                    key_id: "filter-key",
                    item_id: randomUUID(),
                    category_key: randomUUID()
                }
            ;
            const specificItem: Parameters<StoreDatasetItemCategorisation>[0] = 
                {
                    dataset_id: datasetId,
                    key_id: randomUUID(),
                    item_id: "filter-item",
                    category_key: randomUUID()
                }
            ;
            const specificCat: Parameters<StoreDatasetItemCategorisation>[0] = 
                {
                    dataset_id: datasetId,
                    key_id: randomUUID(),
                    item_id: randomUUID(),
                    category_key: "filter-category"
                }
            ;

            const storedKey = await config.storage.datasetItemCategorisation
                .storeCategorisation(specificKey, testClient).unwrapOr("");
                
            const storedItem = await config.storage.datasetItemCategorisation
                .storeCategorisation(specificItem, testClient).unwrapOr("");
            
            const storedCat = await config.storage.datasetItemCategorisation
                .storeCategorisation(specificCat, testClient).unwrapOr("");
                
            const allRes = await config.storage.datasetItemCategorisation
                .readCategorisations(datasetId, undefined, testClient);
            expect(allRes.isOk()).toBeTruthy();
            expect(allRes._unsafeUnwrap())
                .toEqual([
                    { id: storedKey, ...specificKey},
                    { id: storedItem, ...specificItem},
                    { id: storedCat, ...specificCat}
                ]);

            const catRes = await config.storage.datasetItemCategorisation
                .readCategorisations(datasetId, { 
                    category_key: specificCat.category_key
                }, testClient);
            expect(catRes.isOk()).toBeTruthy();
            expect(catRes._unsafeUnwrap())
                .toEqual([
                    { id: storedCat, ...specificCat}
                ]);
            const keyRes = await config.storage.datasetItemCategorisation
                .readCategorisations(datasetId, { 
                    key_id: specificKey.key_id
                }, testClient);
            expect(keyRes.isOk()).toBeTruthy();
            expect(keyRes._unsafeUnwrap())
                .toEqual([
                    { id: storedKey, ...specificKey}
                ]);
            const itemRes = await config.storage.datasetItemCategorisation
                .readCategorisations(datasetId, { 
                    item_id: specificItem.item_id
                }, testClient);
            expect(itemRes.isOk()).toBeTruthy();
            expect(itemRes._unsafeUnwrap())
                .toEqual([
                    { id: storedItem, ...specificItem}
                ]);
        });
    }
);
