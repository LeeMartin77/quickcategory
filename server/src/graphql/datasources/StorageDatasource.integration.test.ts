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
});