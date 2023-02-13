import { StorageError } from "./StorageErrors";

export type DatasetAdminKey = {
  dataset_id: string,
  id: string,
  hashed_admin_secret: string,
  admin_secret_salt: string
}

export type StoreDatasetAdminKey = (
  key: Omit<DatasetAdminKey, "id">
) => Promise<DatasetAdminKey["id"] | StorageError>;

export type DeleteDatasetAdminKey = (
  datasetId: DatasetAdminKey["dataset_id"]
) => Promise<boolean | StorageError>;

export type RetreiveDatasetAdminKey = (
  id: DatasetAdminKey["id"]
) => Promise<DatasetAdminKey | StorageError>;

export interface ConfigurationStorage {
  storeAdminKey: StoreDatasetAdminKey;
  deleteAdminKey: DeleteDatasetAdminKey;
  readAdminKey: RetreiveDatasetAdminKey;
}
