import { StorageError } from "./StorageErrors";

export type DataSetAdminKey = {
  dataset_id: string,
  id: string,
  hashed_admin_secret: string,
  admin_secret_salt: string
}

export type StoreDataSetAdminKey = (
  key: Omit<DataSetAdminKey, "id">
) => Promise<DataSetAdminKey["id"] | StorageError>;

export type DeleteDataSetAdminKey = (
  datasetId: DataSetAdminKey["dataset_id"]
) => Promise<boolean | StorageError>;

export type RetreiveDataSetAdminKey = (
  id: DataSetAdminKey["id"]
) => Promise<DataSetAdminKey | StorageError>;

export interface ConfigurationStorage {
  storeAdminKey: StoreDataSetAdminKey;
  deleteAdminKey: DeleteDataSetAdminKey;
  readAdminKey: RetreiveDataSetAdminKey;
}
