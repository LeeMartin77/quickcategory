import { DatasetCategory } from "../../../storage/types/DatasetCategory";
import { AnonAccessParameter, GQLContext } from "../../types";
import { canAccessDataset } from "../utilities/accessCheck";

type AddDatasetCategoryArgs = AnonAccessParameter & {
    datasetId: string,
    categoryKey: string,
    categoryName: string
};

export const addDatasetCategory = async (
    _: object,
    { access, datasetId, categoryKey, categoryName }: AddDatasetCategoryArgs,
    { dataSources: { storage }}: GQLContext
): Promise<DatasetCategory> => {
    const { dataset_id } = await canAccessDataset(storage, access, datasetId);
    const cat = {
        dataset_id,
        key: categoryKey,
        name: categoryName
    };
    const res = await storage.storage.datasetCategory.storeCategory(cat);
    if (res.isErr())
        throw res.error;
    return cat;
};