import { StoreDatasetCategorisationKey } from "../types/DatasetCategorisationKey";

export function isValidCategorisationKey(
    key: Parameters<StoreDatasetCategorisationKey>[0]
): boolean {
    //eslint-disable-next-line max-len
    type StoreDatasetCategorisationKeyKeys = keyof Parameters<StoreDatasetCategorisationKey>[0];
    const keys: StoreDatasetCategorisationKeyKeys[] = ["dataset_id", "label"];
    if (Object.keys(key).length > keys.length || 
        keys.some(k => key[k] === undefined || key[k] === null || key[k] === ""))
        return false;
    return true;
}