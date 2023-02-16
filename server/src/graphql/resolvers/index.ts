import { createAnonymousDataset } from "./mutations/createAnonymousDataset";
import { addDatasetCategory } from "./mutations/addDatasetCategory";
import { datasetAdminKey } from "./queries/datasetAdminKey";
import { DatasetAdminKey } from "./subresolvers/DatasetAdminKey";
import { addDatasetItems } from "./mutations/addDatasetItems";
import { addCategorisationKey } from "./mutations/addCategorisationKey";

export default [
    {
        DatasetAdminKey,
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
            createAnonymousDataset,
            addDatasetItems,
            addDatasetCategory,
            addCategorisationKey
        },
    }];