/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResultAsync } from "neverthrow";
import { StorageError } from "./StorageErrors";

export type DatasetCategory = {
  dataset_id: string,
  key: string,
  name: string,
}

export type StoreDatasetCategory = (
  category: DatasetCategory,
  client?: any
) => ResultAsync<DatasetCategory["key"], StorageError>;

export type DeleteDatasetCategory = (
  dataset_id: DatasetCategory["dataset_id"],
  key: DatasetCategory["key"],
  client?: any
) => ResultAsync<boolean, StorageError>;

export type RetreiveDatasetCategories = (
  dataset_ids: [DatasetCategory["dataset_id"]],
  client?: any
) => ResultAsync<DatasetCategory[], StorageError>;

export interface DatasetCategoryStorage {
  storeCategory: StoreDatasetCategory;
  deleteCategory: DeleteDatasetCategory;
  readCategories: RetreiveDatasetCategories;
}
