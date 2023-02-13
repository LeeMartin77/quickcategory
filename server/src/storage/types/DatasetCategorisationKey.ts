/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResultAsync } from "neverthrow";
import { StorageError } from "./StorageErrors";

export type DatasetCategorisationKey = {
  dataset_id: string,
  id: string,
  label: string,
}

export type StoreDatasetCategorisationKey = (
  key: Omit<DatasetCategorisationKey, "id">,
  client?: any
) => ResultAsync<DatasetCategorisationKey["id"], StorageError>;

export type DeleteDatasetCategorisationKey = (
  datasetId: DatasetCategorisationKey["dataset_id"],
  client?: any
) => ResultAsync<boolean, StorageError>;

export type RetreiveDatasetCategorisationKey = (
  id: DatasetCategorisationKey["id"],
  client?: any
) => ResultAsync<DatasetCategorisationKey, StorageError>;

export interface DatasetCategorisationKeyStorage {
  storeCategorisationKey: StoreDatasetCategorisationKey;
  deleteCategorisationKey: DeleteDatasetCategorisationKey;
  readCategorisationKey: RetreiveDatasetCategorisationKey;
}