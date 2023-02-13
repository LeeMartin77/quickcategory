import { DatasetAdminKeyStorage } from "./types/DatasetAdminKey";

export interface StorageType {
  setupDatabase: () => Promise<void>;
  shutdownDatabase: () => Promise<void>;
  datasetAdminKey: DatasetAdminKeyStorage
}
