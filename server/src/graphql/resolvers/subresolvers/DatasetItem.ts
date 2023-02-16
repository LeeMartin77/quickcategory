import { DatasetCategory } from "../../../storage/types/DatasetCategory";
import { GQLContext } from "../../types";

const value_info = async (
    {dataset_id}: {dataset_id: string},
    __: never,
    { dataSources: { storage }}: GQLContext
): Promise<{
    index: number,
    type: string,
    label: string
}[]> => {
    const { item_labels, item_type_keys } = 
        await storage.getDatasetForId(dataset_id);
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
    {dataset_id}: {dataset_id: string},
    __: never,
    { dataSources: { storage }}: GQLContext
): Promise<DatasetCategory[]> => {
    return storage.getDatasetCategoriesForDatasetId(dataset_id);
};

export const DatasetItem = {
    value_info,
    categories
};