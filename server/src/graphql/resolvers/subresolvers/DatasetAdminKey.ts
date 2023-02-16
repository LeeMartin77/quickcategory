import { GQLContext } from "../../types";

export const DatasetAdminKey = {
    data_set: (
        {dataset_id}: {dataset_id: string},
        __: never,
        { dataSources: { storage }}: GQLContext
    ) => {
        return storage.getDatasetForId(dataset_id);
    },
};