import { StoreDataset, UpdateDataset } from "../types/Dataset";

export function isValidDataset(
    dataset: Parameters<StoreDataset>[0]
): boolean {
    type StoreDatasetKeys = keyof Parameters<StoreDataset>[0];
    const stringKeys: StoreDatasetKeys[] = ["name", "item_labels", "item_type_keys"];
    if (Object.keys(dataset).length > stringKeys.length || 
        stringKeys.some(k => dataset[k] === undefined || dataset[k] === null || dataset[k] === "")
        || dataset.item_labels.length === 0 
        || dataset.item_type_keys.length === 0
        || dataset.item_labels.length !== dataset.item_type_keys.length)
        return false;
    return true;
}

export function isValidDatasetUpdate(
    dataset: Parameters<UpdateDataset>[1]
): boolean {
    type StoreDatasetKeys = keyof Parameters<UpdateDataset>[1];
    const stringKeys: StoreDatasetKeys[] = ["name", "item_labels", "item_type_keys"];
    if (Object.keys(dataset).length > stringKeys.length || 
        stringKeys.some(k => dataset[k] !== undefined && (dataset[k] === null || dataset[k] === ""))
        || (dataset.item_labels !== undefined 
            && dataset.item_labels.length === 0)
        || (dataset.item_type_keys !== undefined 
            && dataset.item_type_keys.length === 0))
        return false;
    return true;
}