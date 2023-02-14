import { DatasetStorage } from "./types/Dataset";
import { DatasetAdminKeyStorage } from "./types/DatasetAdminKey";
import { DatasetCategorisationKeyStorage } from "./types/DatasetCategorisationKey";

export interface StorageType {
  setupDatabase: () => Promise<void>;
  shutdownDatabase: () => Promise<void>;
  dataset: DatasetStorage;
  datasetAdminKey: DatasetAdminKeyStorage;
  datasetCategorisationKey: DatasetCategorisationKeyStorage
}
