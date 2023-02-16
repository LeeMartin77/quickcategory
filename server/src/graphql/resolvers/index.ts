import { GQLContext } from "../types";
import { createAnonymousDataset } from "./mutations/createAnonymousDataset";
import { datasetAdminKey } from "./queries/datasetAdminKey";

export default [{
    DatasetAdminKey: {
        data_set: (
            {dataset_id}: {dataset_id: string},
            __: never,
            { dataSources: { storage }}: GQLContext
        ) => {
            return storage.getDatasetForId(dataset_id);
        },
    },
    Dataset: {
        value_info: () => {
            throw new Error("Not Implemented");
        },
        categories: () => {
            throw new Error("Not Implemented");
        },
        categorisations: () => {
            throw new Error("Not Implemented");
        },
        categorisation_keys: () => {
            throw new Error("Not Implemented");
        },
        items: () => {
            throw new Error("Not Implemented");
        },
        item_count: () => {
            throw new Error("Not Implemented");
        },
    },
    DatasetItem: {
        value_info: () => {
            throw new Error("Not Implemented");
        },
        categories: () => {
            throw new Error("Not Implemented");
        },
    },
    Query: {
        datasetAdminKey
    },
    Mutation: {
        addCategorisationKey: () => {
            throw new Error("Not Implemented");
        },
        addDatasetItems: () => {
            throw new Error("Not Implemented");
        },
        addDatasetCategory: () => {
            throw new Error("Not Implemented");
        },
        categoriseItem: () => {
            throw new Error("Not Implemented");
        },
        deleteCategorisationKey: () => {
            throw new Error("Not Implemented");
        },
        deleteDatasetItems: () => {
            throw new Error("Not Implemented");
        },
        deleteDatasetCategory: () => {
            throw new Error("Not Implemented");
        },
        getItemToCategorise: () => {
            throw new Error("Not Implemented");
        },
        updateCategorisationKey: () => {
            throw new Error("Not Implemented");
        },
        updateDatasetCategory: () => {
            throw new Error("Not Implemented");
        },
        createAnonymousDataset
    },
}];