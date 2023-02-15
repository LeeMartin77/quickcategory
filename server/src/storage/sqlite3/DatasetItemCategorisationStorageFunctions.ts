import { Knex } from "knex";
import { knexInstance } from ".";
import * as DIC from "../types/DatasetItemCategorisation";
import { SystemError } from "../types/StorageErrors";
import { ResultAsync } from "neverthrow";
import { randomUUID } from "crypto";

export const storeCategorisation: DIC.StoreDatasetItemCategorisation = (
    categorisation,
    knex: Knex = knexInstance
) => {
    const inserted = { id: randomUUID(), ...categorisation };
    return ResultAsync.fromPromise(
        knex.insert(inserted)
            .into("dataset_item_categorisation")
            .then(() => {
                return inserted.id;
            }), 
        () => new SystemError());
};
export const deleteCategorisation: DIC.DeleteDatasetItemCategorisation = (
    datasetId,
    id,
    knex: Knex = knexInstance
) => {
    return ResultAsync.fromPromise(
        knex.delete().from("dataset_item_categorisation")
            .where("dataset_id", datasetId)
            .andWhere("id", id)
            .then(() => {
                return true;
            }), 
        () => new SystemError());
};
export const readCategorisations: DIC.RetreiveDatasetCategorisations = (
    datasetId,
    filters,
    knex: Knex = knexInstance
) => {
    const query = knex.select<DIC.DatasetItemCategorisation[]>()
        .from("dataset_item_categorisation")
        .where("dataset_id", datasetId);
    if (filters) {
        Object.entries(filters).forEach(([key, val])=> {
            query.andWhere(key, val);
        });
    }
    return ResultAsync.fromPromise(
        query.then(res => {
            return res;
        }), 
        () => new SystemError());
};