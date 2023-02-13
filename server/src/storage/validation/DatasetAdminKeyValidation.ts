import { StoreDatasetAdminKey } from "../types/DatasetAdminKey";

export function isValidAdminKey(
    key: Parameters<StoreDatasetAdminKey>[0]
): boolean {
    type StoreDatasetAdminKeyKeys = keyof Parameters<StoreDatasetAdminKey>[0];
    const keys: StoreDatasetAdminKeyKeys[] = ["admin_secret_salt","dataset_id", "hashed_admin_secret"];
    if (Object.keys(key).length > keys.length || 
        keys.some(k => key[k] === undefined || key[k] === null || key[k] === ""))
        return false;
    return true;
}