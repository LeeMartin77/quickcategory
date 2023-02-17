import DataLoader from "dataloader";
import { StorageType } from "../../storage/interfaces";
import { Dataset } from "../../storage/types/Dataset";
import { DatasetAdminKey } from "../../storage/types/DatasetAdminKey";
import { DatasetCategorisationKey } from "../../storage/types/DatasetCategorisationKey";
import { DatasetCategory } from "../../storage/types/DatasetCategory";
import { DatasetItem } from "../../storage/types/DatasetItem";
import { DatasetItemCategorisation } from "../../storage/types/DatasetItemCategorisation";

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
                .filter((entity: any) => entity[mappingProp] === id)
            );
        }
        throw entityRes.error;
    });
};

export class StorageDatasource {
    public storage: StorageType;

    private _batchDataset;
    private _batchDatasetAdminKey;
    private _batchDatasetCategory;
    private _batchDatasetCategorisationKey;
    private _batchDatasetCategorisationKeys;
    private _batchDatasetItemCategorisations;
    private _batchDatasetItem;

    constructor(storage: StorageType) {
        this.storage = storage;
        storage.datasetItemCategorisation.readCategorisations;
        this._batchDataset = generateBasicDataLoader(this.storage, "dataset", "readDataset", "id");
        this._batchDatasetAdminKey = generateBasicDataLoader(this.storage, "datasetAdminKey", "readAdminKey", "id");
        this._batchDatasetCategorisationKey = generateBasicDataLoader(this.storage, "datasetCategorisationKey", "readCategorisationKey", "id");

        //multi       
        this._batchDatasetItemCategorisations = generateBasicMultiDataLoader(this.storage, "datasetItemCategorisation", "readCategorisations", "dataset_id");
        this._batchDatasetCategory = generateBasicMultiDataLoader(this.storage, "datasetCategory", "readCategories", "dataset_id");
        this._batchDatasetCategorisationKeys = generateBasicMultiDataLoader(this.storage, "datasetCategorisationKey", "readCategorisationKeysForDataset", "dataset_id");
        this._batchDatasetItem = generateBasicMultiDataLoader(this.storage, "datasetItem", "readItems", "dataset_id");
    }

    public async getDatasetForId(id: string): Promise<Dataset | undefined> {
        return this._batchDataset.load(id);
    }

    // eslint-disable-next-line max-len
    public async getDatasetAdminKeyForId(id: string): Promise<DatasetAdminKey | undefined> {
        return this._batchDatasetAdminKey.load(id);
    }

    public async getDatasetCategorisationKeyForId(id: string): 
        Promise<DatasetCategorisationKey | undefined> {
        return this._batchDatasetCategorisationKey.load(id);
    }

    public async getDatasetCategorisationKeysForDatasetId(dataset_id: string): 
        Promise<DatasetCategorisationKey[]> {
        return this._batchDatasetCategorisationKeys.load(dataset_id);
    }

    public async getDatasetCategoriesForDatasetId(dataset_id: string): 
        Promise<DatasetCategory[]> {
        return this._batchDatasetCategory.load(dataset_id);
    }

    // TODO: This needs pagination...
    public async getDatasetItemsForDatasetId(dataset_id: string): 
        Promise<DatasetItem[]> {
        return this._batchDatasetItem.load(dataset_id);
    }

    // TODO: This needs pagination...
    public async getDatasetItemCategorisationsForDatasetId(dataset_id: string): 
    Promise<DatasetItemCategorisation[]> {
        return this._batchDatasetItemCategorisations.load(dataset_id);
    }
}
