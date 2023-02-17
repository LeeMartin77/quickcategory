import { datasetAdminKey } from "./queries/datasetAdminKey";

import { createAnonymousDataset } from "./mutations/createAnonymousDataset";
import { addDatasetCategory } from "./mutations/addDatasetCategory";
import { addDatasetItems } from "./mutations/addDatasetItems";
import { addCategorisationKey } from "./mutations/addCategorisationKey";

import { categoriseItem } from "./mutations/categoriseItem";
import { getItemToCategorise } from "./mutations/getItemToCategorise";

import { Dataset } from "./subresolvers/Dataset";
import { DatasetItem } from "./subresolvers/DatasetItem";
import { DatasetAdminKey } from "./subresolvers/DatasetAdminKey";

export default [
    {
        DatasetAdminKey,
        Dataset,
        DatasetItem,
        Query: {
            datasetAdminKey
        },
        Mutation: {
            deleteCategorisationKey: () => {
                throw new Error("Not Implemented");
            },
            deleteDatasetItems: () => {
                throw new Error("Not Implemented");
            },
            deleteDatasetCategory: () => {
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
            addCategorisationKey,
            categoriseItem,
            getItemToCategorise
        },
    }];