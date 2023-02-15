import { randomUUID } from "node:crypto";
import { STORAGE } from "../../storage";
import { StorageDatasource } from "./StorageDatasource";

describe("StorageDatasource :: Integration using SQLite3", () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
        // Tell storage to use SQLite3 with a memory database
        process.env.QUICKCATEGORY_STORAGE_PROVIDER = "sqlite3";
        process.env.QUICKCATEGORY_SQLITE3_FILENAME = ":memory:";
        STORAGE.setupDatabase();
    });
    afterAll(() => {
        process.env = OLD_ENV;
        STORAGE.shutdownDatabase();
    });
    test("Datasets Batch Loaded", async () => {
        // Create a pair of datasets:
        const datasetInserts = ["SomeDatasetName", "SomeOtherDatasetName"].map((name) => ({
            name,
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
        }));
        
        const datasetId0 = (await STORAGE.dataset
            .storeDataset(datasetInserts[0])
        )._unsafeUnwrap();
        const datasetId1 = (await STORAGE.dataset
            .storeDataset(datasetInserts[1])
        )._unsafeUnwrap();

        const datasource = new StorageDatasource(STORAGE);

        const loaded0 = await datasource.getDatasetForId(datasetId0);
        expect(loaded0.name).toBe(datasetInserts[0].name);
        const loaded1 = await datasource.getDatasetForId(datasetId1);
        expect(loaded1.name).toBe(datasetInserts[1].name);
    });
    test("DatasetAdminKeys Batch Loaded", async () => {
        // Create a pair of datasets:
        const inserts = [randomUUID(), randomUUID()].map((dataset_id) => ({
            dataset_id,
            hashed_admin_secret: randomUUID(),
            admin_secret_salt: randomUUID()
        }));
        
        const insertedId0 = (await STORAGE.datasetAdminKey
            .storeAdminKey(inserts[0])
        )._unsafeUnwrap();
        const insertedId1 = (await STORAGE.datasetAdminKey
            .storeAdminKey(inserts[1])
        )._unsafeUnwrap();

        const datasource = new StorageDatasource(STORAGE);

        const loaded0 = await datasource.getDatasetAdminKeyForId(insertedId0);
        expect(loaded0.dataset_id).toBe(inserts[0].dataset_id);
        const loaded1 = await datasource.getDatasetAdminKeyForId(insertedId1);
        expect(loaded1.dataset_id).toBe(inserts[1].dataset_id);
    });
    test("DatasetCategory Batch Loaded", async () => {
        // Create a pair of datasets:
        const inserts = [randomUUID(), randomUUID()].map((dataset_id) => ({
            dataset_id,
            key: randomUUID(),
            name: randomUUID()
        }));
        
        await STORAGE.datasetCategory.storeCategory(inserts[0]);
        await STORAGE.datasetCategory.storeCategory(inserts[1]);

        const datasource = new StorageDatasource(STORAGE);

        const loaded0 = await datasource
            .getDatasetCategoriesForDatasetId(inserts[0].dataset_id);
        expect(loaded0.map(x => x.key)).toEqual([inserts[0].key]);
        const loaded1 = await datasource
            .getDatasetCategoriesForDatasetId(inserts[1].dataset_id);
        expect(loaded1.map(x => x.key)).toEqual([inserts[1].key]);
    });
    test("DatasetItem Batch Loaded", async () => {
        // Create a pair of datasets:
        const inserts = [randomUUID(), randomUUID()].map((dataset_id) => ({
            dataset_id,
            values: [
                { index: 0, value: "something" }
            ]
        }));
        
        await STORAGE.datasetItem.storeItems(inserts);

        const datasource = new StorageDatasource(STORAGE);

        const loaded0 = await datasource
            .getDatasetItemsForDatasetId(inserts[0].dataset_id);
        expect(loaded0.map(x => x.dataset_id)).toEqual([inserts[0].dataset_id]);
        const loaded1 = await datasource
            .getDatasetItemsForDatasetId(inserts[1].dataset_id);
        expect(loaded1.map(x => x.dataset_id)).toEqual([inserts[1].dataset_id]);
    });
    test("DatasetCategorisationKey Batch Loaded", async () => {
        // Create a pair of datasets:
        const inserts = [randomUUID(), randomUUID()].map((dataset_id) => ({
            dataset_id,
            label: randomUUID()
        }));
        
        const insertedId0 = (await STORAGE.datasetCategorisationKey
            .storeCategorisationKey(inserts[0])
        )._unsafeUnwrap();
        const insertedId1 = (await STORAGE.datasetCategorisationKey
            .storeCategorisationKey(inserts[1])
        )._unsafeUnwrap();

        const datasource = new StorageDatasource(STORAGE);

        const loaded0 = await datasource
            .getDatasetCategorisationKeyForId(insertedId0);
        expect(loaded0.dataset_id).toEqual(inserts[0].dataset_id);

        const loaded1 = await datasource
            .getDatasetCategorisationKeyForId(insertedId1);
        expect(loaded1.dataset_id).toEqual(inserts[1].dataset_id);
    });
});