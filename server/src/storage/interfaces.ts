import { DatasetAdminKeyStorage } from "./types/DatasetAdminKey";
import { DatasetCategorisationKeyStorage } from "./types/DatasetCategorisationKey";

export interface StorageType {
  setupDatabase: () => Promise<void>;
  shutdownDatabase: () => Promise<void>;
  datasetAdminKey: DatasetAdminKeyStorage;
  datasetCategorisationKey: DatasetCategorisationKeyStorage
}
