/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResultAsync } from "neverthrow";
import { StorageError } from "./StorageErrors";

export type DatasetAdminKey = {
  dataset_id: string,
  id: string,
  hashed_admin_secret: string,
  admin_secret_salt: string
}

export type StoreDatasetAdminKey = (
  key: Omit<DatasetAdminKey, "id">,
  client?: any
) => ResultAsync<DatasetAdminKey["id"], StorageError>;

export type DeleteDatasetAdminKey = (
  datasetId: DatasetAdminKey["dataset_id"],
  client?: any
) => ResultAsync<boolean, StorageError>;

export type RetreiveDatasetAdminKey = (
  id: DatasetAdminKey["id"],
  client?: any
) => ResultAsync<DatasetAdminKey, StorageError>;

export interface DatasetAdminKeyStorage {
  storeAdminKey: StoreDatasetAdminKey;
  deleteAdminKey: DeleteDatasetAdminKey;
  readAdminKey: RetreiveDatasetAdminKey;
}
