import DataLoader from "dataloader";
import { StorageType } from "../../storage/interfaces";
import { Dataset } from "../../storage/types/Dataset";

// This is a bit any-heavy, it just saves me some annoying boilerplate
// And I don't fancy spending my life fighting types
const generateBasicDataLoader = (
    strg: any,
    entity: keyof Omit<StorageType, "setupDatabase"|"shutdownDatabase">, 
    fnc: string, 
    mappingProp: string) => {
    return new DataLoader(async (ids) => {
        const entityRes = await strg[entity][fnc](ids as string[]);
        if(entityRes.isOk()) {
            const entities = entityRes.value;
            return ids.map((id) => entities
                .find((entity: any) => entity[mappingProp] === id)
            );
        }
        throw entityRes.error;
    });
};

export class StorageDatasource {
    private _storage: StorageType;

    private _batchDataset;

    constructor(storage: StorageType) {
        this._storage = storage;
        this._batchDataset = generateBasicDataLoader(this._storage, "dataset", "readDataset", "id");
    }


    async getDatasetForId(id: string): Promise<Dataset> {
        return this._batchDataset.load(id);
    }
}
