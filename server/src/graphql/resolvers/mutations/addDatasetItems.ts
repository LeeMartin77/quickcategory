import { AnonAccessParameter, GQLContext } from "../../types";
import { canAccessDataset } from "../utilities/accessCheck";
import { GqlDatasetItem, storageItemsToGqlItems } from "../utilities/gqlDatasetItemFromStorage";

type AddDatasetItemsArgs = AnonAccessParameter & {
    datasetId: string,
    items: { value: string[] }[]
}

export const addDatasetItems = async (
    _: object,
    { access, datasetId, items }: AddDatasetItemsArgs,
    { dataSources: { storage } }: GQLContext
): Promise<GqlDatasetItem[]> => {
    const { dataset_id } = await canAccessDataset(storage, access, datasetId);
    const res = await storage.storage.datasetItem.storeItems(
        items.map(item => {
            return {
                dataset_id,
                values: item.value.map((value, index) => ({ index, value }))
            };
        })
    );
    if (res.isErr()) {
        throw res.error;
    }
    const { value } = res;
    return storageItemsToGqlItems(value);
};