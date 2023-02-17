
const memoryStore: { [key: string]: string } = {};

export function getItemIdBeingCategorisedByCategorisationKey(
    dataset_id: string,
    id: string
): Promise<string | undefined> {
    return Promise.resolve(memoryStore[dataset_id + id]);
}
export function clearItemIdBeingCategorisedByCategorisationKey(
    dataset_id: string,
    id: string
): Promise<void>{
    if (memoryStore[dataset_id + id])
        delete memoryStore[dataset_id + id];
    return Promise.resolve();
}
export function setItemIdBeingCategorisedByCategorisationKey(
    dataset_id: string,
    id: string,
    item_id: string
): Promise<void>{
    memoryStore[dataset_id + id] = item_id;
    return Promise.resolve();
}