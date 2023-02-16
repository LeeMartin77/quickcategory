import { Resolvers } from "../types";
import { createAnonymousDataset } from "./mutations/createAnonymousDataset";
import { datasetAdminKey } from "./queries/datasetAdminKey";

const unimplemented_resolvers: Resolvers = {
    DatasetAdminKey: {
        data_set: () => {
            throw new Error("Not Implemented");
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
        // This is an annoyance to do with the field being subresolved - see how it plays in the real
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        datasetAdminKey: datasetAdminKey as any
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
};

export default [unimplemented_resolvers];
