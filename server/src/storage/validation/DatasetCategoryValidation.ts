import { StoreDatasetCategory } from "../types/DatasetCategory";

export function isValidCategory(
    key: Parameters<StoreDatasetCategory>[0]
): boolean {
    //eslint-disable-next-line max-len
    type StoreDatasetCategorisationKeyKeys = keyof Parameters<StoreDatasetCategory>[0];
    const keys: StoreDatasetCategorisationKeyKeys[] = ["dataset_id", "key", "name"];
    if (Object.keys(key).length > keys.length || 
        keys.some(k => key[k] === undefined || key[k] === null || key[k] === ""))
        return false;
    return true;
}