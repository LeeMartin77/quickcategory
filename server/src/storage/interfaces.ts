import { DatasetStorage } from "./types/Dataset";
import { DatasetAdminKeyStorage } from "./types/DatasetAdminKey";
import { DatasetCategorisationKeyStorage } from "./types/DatasetCategorisationKey";
import { DatasetCategoryStorage } from "./types/DatasetCategory";
import { DatasetItemStorage } from "./types/DatasetItem";

export interface StorageType {
  setupDatabase: () => Promise<void>;
  shutdownDatabase: () => Promise<void>;
  dataset: DatasetStorage;
  datasetAdminKey: DatasetAdminKeyStorage;
  datasetCategorisationKey: DatasetCategorisationKeyStorage;
  datasetCategory: DatasetCategoryStorage;
  datasetItem: DatasetItemStorage;
}
