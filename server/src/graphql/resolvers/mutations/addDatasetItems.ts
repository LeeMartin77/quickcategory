import { DatasetItem } from "../../../storage/types/DatasetItem";
import { AnonAccessParameter, GQLContext } from "../../types";
import { canAccessDataset } from "../utilities/accessCheck";

type AddDatasetItemsArgs = AnonAccessParameter & {
    datasetId: string,
    items: string[][]
}

type AddDatasetItemsResponse = {
    dataset_id: string,
    id: string,
    value: string[]
}[]

export const storageItemsToGqlItems = (sItems: DatasetItem[]): {
    dataset_id: string,
    id: string,
    value: string[]
}[] => {
    return sItems.map(item => {
        item.values.sort((a, b) => a.index - b.index);
        return {
            dataset_id: item.dataset_id,
            id: item.id,
            value: item.values.map(x => x.value)
        };
    });
};

export const addDatasetItems = async (
    _: object,
    { access, datasetId, items }: AddDatasetItemsArgs,
    { dataSources: { storage } }: GQLContext
): Promise<AddDatasetItemsResponse> => {
    const { dataset_id } = await canAccessDataset(storage, access, datasetId);
    const res = await storage.storage.datasetItem.storeItems(
        items.map(item => {
            return {
                dataset_id,
                values: item.map((value, index) => ({ index, value }))
            };
        })
    );
    if (res.isErr()) {
        throw res.error;
    }
    const { value } = res;
    return storageItemsToGqlItems(value);
};