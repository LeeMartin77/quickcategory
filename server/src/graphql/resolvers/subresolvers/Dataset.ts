import { GQLContext } from "../../types";
import { DatasetCategory } from "../../../storage/types/DatasetCategory";
import { GqlDatasetItem, storageItemsToGqlItems } from "../utilities/gqlDatasetItemFromStorage";

const value_info = async (
    {id}: {id: string},
    __: never,
    { dataSources: { storage }}: GQLContext
): Promise<{
    index: number,
    type: string,
    label: string
}[]> => {
    const dataset = 
        await storage.getDatasetForId(id);
    if (!dataset) {
        return [];
    }
    const { item_labels, item_type_keys } = dataset;
    return item_labels.map((label) => {
        return {
            index: label.index,
            label: label.value,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            type: item_type_keys.find(x => x.index === label.index)!.value
        };
    });
};

const categories = (
    {id}: {id: string},
    __: never,
    { dataSources: { storage }}: GQLContext
): Promise<DatasetCategory[]> => {
    return storage.getDatasetCategoriesForDatasetId(id);
};

export const Dataset = {
    value_info,
    categories,
    categorisations: (
        {id}: {id: string},
        __: never,
        { dataSources: { storage }}: GQLContext
    ) => {
        return storage.getDatasetItemCategorisationsForDatasetId(id);
    },
    categorisation_keys: (
        {id}: {id: string},
        __: never,
        { dataSources: { storage }}: GQLContext
    ) => {
        return storage.getDatasetCategorisationKeysForDatasetId(id);
    },
    items: async (
        {id}: {id: string},
        __: never,
        { dataSources: { storage }}: GQLContext
    ): Promise<GqlDatasetItem[]> => {
        const raw_items = await storage.getDatasetItemsForDatasetId(id);
        return storageItemsToGqlItems(raw_items);
    },
    item_count: async (
        {id}: {id: string},
        __: never,
        { dataSources: { storage }}: GQLContext
    ): Promise<number> => {
        // TODO: Discrete storage method
        return (await storage.getDatasetItemsForDatasetId(id)).length;
    },
};