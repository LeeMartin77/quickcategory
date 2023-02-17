import { DatasetItem } from "../../../storage/types/DatasetItem";

export type GqlDatasetItem = {
    dataset_id: string,
    id: string,
    value: string[]
}

export const storageItemsToGqlItems = (sItems: DatasetItem[]): 
    GqlDatasetItem[] => {
    return sItems.map(item => {
        item.values.sort((a, b) => a.index - b.index);
        return {
            dataset_id: item.dataset_id,
            id: item.id,
            value: item.values.map(x => x.value)
        };
    });
};