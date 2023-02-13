import { Resolvers } from "../types";

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
    datasetAdminKey: () => {
      throw new Error("Not Implemented");
    },
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
    createAnonymousDataset: () => {
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
  },
};

export default [unimplemented_resolvers];
