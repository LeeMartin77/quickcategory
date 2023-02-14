import { StoreDatasetItems } from "../types/DatasetItem";

export function isValidCreateItem(
    items: Parameters<StoreDatasetItems>[0]
): boolean {
    //eslint-disable-next-line max-len
    type StoreDatasetCategorisationKeyKeys = keyof Parameters<StoreDatasetItems>[0][0];
    const keys: StoreDatasetCategorisationKeyKeys[] = ["dataset_id", "values"];
    if (items.some(item => {
        return Object.keys(item).length !== keys.length ||
        keys.some(k => item[k] === undefined || item[k] === null || item[k] === "");
    }))
        return false;
    return true;
}