/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResultAsync } from "neverthrow";
import { StorageError } from "./StorageErrors";
import { Ordered } from "./Utility";

export type Dataset = {
  id: string,
  name: string,
  item_type_keys: Ordered<string>,
  item_labels: Ordered<string>
}

export type StoreDataset = (
  dataset: Omit<Dataset, "id">,
  client?: any
) => ResultAsync<Dataset["id"], StorageError>;

export type UpdateDataset = (
    id: Dataset["id"],
    properties: Partial<Omit<Dataset, "id">>,
    client?: any
) => ResultAsync<Dataset["id"], StorageError>;  

export type DeleteDataset = (
  id: Dataset["id"],
  client?: any
) => ResultAsync<boolean, StorageError>;

export type RetreiveDataset = (
  ids: Dataset["id"][],
  client?: any
) => ResultAsync<Dataset[], StorageError>;

export interface DatasetStorage {
  storeDataset: StoreDataset;
  updateDataset: UpdateDataset;
  deleteDataset: DeleteDataset;
  readDataset: RetreiveDataset;
}
