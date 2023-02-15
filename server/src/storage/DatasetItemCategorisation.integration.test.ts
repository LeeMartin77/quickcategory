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
    }
);
