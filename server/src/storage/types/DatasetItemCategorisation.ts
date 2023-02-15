/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResultAsync } from "neverthrow";
import { StorageError } from "./StorageErrors";

export type DatasetItemCategorisation = {
  dataset_id: string,
  id: string,
  category_key: string,
  item_id: string,
  key_id: string,
}

export type StoreDatasetItemCategorisation = (
  categorisation: Omit<DatasetItemCategorisation, "id">,
  client?: any
) => ResultAsync<DatasetItemCategorisation["id"], StorageError>;

export type DeleteDatasetItemCategorisation = (
  dataset_id: DatasetItemCategorisation["dataset_id"],
  id: DatasetItemCategorisation["id"],
  client?: any
) => ResultAsync<boolean, StorageError>;

export type RetreiveDatasetCategorisations = (
  dataset_ids: DatasetItemCategorisation["dataset_id"][],
  filters?: Partial<Pick<DatasetItemCategorisation, "category_key" | "item_id" | "key_id">>,
  client?: any
) => ResultAsync<DatasetItemCategorisation[], StorageError>;

export interface DatasetItemCategorisationStorage {
  storeCategorisation: StoreDatasetItemCategorisation;
  deleteCategorisation: DeleteDatasetItemCategorisation;
  readCategorisations: RetreiveDatasetCategorisations;
}
