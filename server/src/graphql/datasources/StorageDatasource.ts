import DataLoader from "dataloader";
import { StorageType } from "../../storage/interfaces";
import { Dataset } from "../../storage/types/Dataset";
import { DatasetAdminKey } from "../../storage/types/DatasetAdminKey";
import { DatasetCategory } from "../../storage/types/DatasetCategory";

// This is a bit any-heavy, it just saves me some annoying boilerplate
// And I don't fancy spending my life fighting types
const generateBasicDataLoader = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    strg: any,
    entity: keyof Omit<StorageType, "setupDatabase"|"shutdownDatabase">, 
    fnc: string, 
    mappingProp: string) => {
    return new DataLoader(async (ids) => {
        const entityRes = await strg[entity][fnc](ids as string[]);
        if(entityRes.isOk()) {
            const entities = entityRes.value;
            return ids.map((id) => entities
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .find((entity: any) => entity[mappingProp] === id)
            );
        }
        throw entityRes.error;
    });
};

const generateBasicMultiDataLoader = (
    strg: any,
    entity: keyof Omit<StorageType, "setupDatabase"|"shutdownDatabase">, 
    fnc: string, 
    mappingProp: string) => {
    return new DataLoader(async (ids) => {
        const entityRes = await strg[entity][fnc](ids as string[]);
        if(entityRes.isOk()) {
            const entities = entityRes.value;
            return ids.map((id) => entities                
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .filter((entity: any) => entity[mappingProp] === id)
            );
        }
        throw entityRes.error;
    });
};

export class StorageDatasource {
    private _storage: StorageType;

    private _batchDataset;
    private _batchDatasetAdminKey;
    private _batchDatasetCategory;
    private _batchDatasetCategorisationKey;
    private _batchDatasetItem;

    constructor(storage: StorageType) {
        this._storage = storage;
        this._batchDataset = generateBasicDataLoader(this._storage, "dataset", "readDataset", "id");
        this._batchDatasetAdminKey = generateBasicDataLoader(this._storage, "datasetAdminKey", "readAdminKey", "id");
        this._batchDatasetCategorisationKey = generateBasicDataLoader(this._storage, "datasetCategorisationKey", "readCategorisationKey", "id");

        //multi       
        this._batchDatasetCategory = generateBasicMultiDataLoader(this._storage, "datasetCategory", "readCategories", "dataset_id");
        this._batchDatasetItem = generateBasicMultiDataLoader(this._storage, "datasetItem", "readItems", "dataset_id");
    }

    public async getDatasetForId(id: string): Promise<Dataset> {
        return this._batchDataset.load(id);
    }

    public async getDatasetAdminKeyForId(id: string): Promise<DatasetAdminKey> {
        return this._batchDatasetAdminKey.load(id);
    }

    public async getDatasetCategoriesForDatasetId(dataset_id: string): 
        Promise<DatasetCategory[]> {
        return this._batchDatasetCategory.load(dataset_id);
    }

    public async getDatasetItemsForDatasetId(dataset_id: string): 
        Promise<DatasetCategory[]> {
        return this._batchDatasetItem.load(dataset_id);
    }
}
