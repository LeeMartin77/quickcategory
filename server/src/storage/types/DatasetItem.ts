/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResultAsync } from "neverthrow";
import { StorageError } from "./StorageErrors";
import { Ordered } from "./Utility";

export type DatasetItem = {
  dataset_id: string,
  id: string,
  values: Ordered<string>,
}

export type StoreDatasetItems = (
  items: Omit<DatasetItem, "id">[],
  client?: any
) => ResultAsync<DatasetItem[], StorageError>;

export type DeleteDatasetItem = (
  dataset_id: DatasetItem["dataset_id"],
  id: DatasetItem["id"],
  client?: any
) => ResultAsync<boolean, StorageError>;

export type RetreiveDatasetItems = (
  dataset_ids: [DatasetItem["dataset_id"]],
  client?: any
) => ResultAsync<DatasetItem[], StorageError>;

export interface DatasetItemStorage {
  storeItems: StoreDatasetItems;
  deleteItem: DeleteDatasetItem;
  readItems: RetreiveDatasetItems;
}
