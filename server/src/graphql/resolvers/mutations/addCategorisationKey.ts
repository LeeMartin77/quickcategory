import { DatasetCategorisationKey } from "../../../storage/types/DatasetCategorisationKey";
import { AnonAccessParameter, GQLContext } from "../../types";
import { canAccessDataset } from "../utilities/accessCheck";

type AddCategorisationKeyArgs = AnonAccessParameter & {
    datasetId: string,
    label: string,
};

export const addCategorisationKey = async (
    _: object,
    { access, datasetId, label }: AddCategorisationKeyArgs,
    { dataSources: { storage }}: GQLContext
): Promise<DatasetCategorisationKey> => {
    const { dataset_id } = await canAccessDataset(storage, access, datasetId);
    const key = {
        dataset_id,
        label
    };
    const res = await storage.storage
        .datasetCategorisationKey.storeCategorisationKey(key);
    if (res.isErr())
        throw res.error;
    return {
        id: res.value,
        ...key
    };
};