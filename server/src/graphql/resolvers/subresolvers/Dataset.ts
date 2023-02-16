import { GQLContext } from "../../types";
import { DatasetCategory } from "../../../storage/types/DatasetCategory";
import { DatasetItem } from "../../../storage/types/DatasetItem";

const value_info = async (
    {id}: {id: string},
    __: never,
    { dataSources: { storage }}: GQLContext
): Promise<{
    index: number,
    type: string,
    label: string
}[]> => {
    const { item_labels, item_type_keys } = 
        await storage.getDatasetForId(id);
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
    items: (
        {id}: {id: string},
        __: never,
        { dataSources: { storage }}: GQLContext
    ): Promise<DatasetItem[]> => {
        return storage.getDatasetItemsForDatasetId(id);
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