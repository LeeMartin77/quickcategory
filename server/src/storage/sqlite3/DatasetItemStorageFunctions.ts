import { Knex } from "knex";
import { knexInstance } from ".";
import * as DI from "../types/DatasetItem";
import { SystemError, ValidationError } from "../types/StorageErrors";
import { randomUUID } from "crypto";
import { errAsync, ResultAsync } from "neverthrow";
import { isValidCreateItem } from "../validation/DatasetItemValidation";

type SQLiteDatasetItem = {
    id: string;
    dataset_id: string;
    // This is because these values are stored/retrieved as json strings
    // and values is a protected keyword
    values_string: string,
}

export const storeItems: DI.StoreDatasetItems = (
    items,
    knex: Knex = knexInstance
) => {
    if (!isValidCreateItem(items)) {
        return errAsync(new ValidationError());
    }
    const insertable = items.map(item => {

        const { values, ...rest} = item;

        return { 
            id: randomUUID(),
            values_string: JSON.stringify(values),
            ...rest
        };
    });
    return ResultAsync.fromPromise(knex.insert(insertable).into("dataset_item").then(() => {
        return insertable.map(item => {
            const { values_string, ...rest } = item;
            return { 
                values: JSON.parse(values_string),
                ...rest
            };
        });
    }), () => new SystemError());
};

export const deleteItem: DI.DeleteDatasetItem = (
    datasetId,
    id,
    knex: Knex = knexInstance
) => {
    return ResultAsync.fromPromise(knex.delete()
        .from("dataset_item")
        .where("dataset_id", datasetId)
        .andWhere("id", id).then(() => {
            return true;
        }), () => new SystemError());
};

export const readItems: DI.RetreiveDatasetItems = (
    datasetIds,
    knex: Knex = knexInstance
) => {
    return ResultAsync.fromPromise(
        knex.select<SQLiteDatasetItem[]>()
            .from("dataset_item")
            .whereIn("dataset_id", datasetIds)
            .then(res => {
                return res.map(item => {
                    const { values_string, ...rest} = item;
                    return {
                        values: JSON.parse(values_string),
                        ...rest
                    };
                });
            }), 
        () => new SystemError()
    );
};


export const readItemsExcept: DI.RetreiveDatasetItemsExcept = (
    datasetIds,
    exclusionIds,
    knex: Knex = knexInstance
) => {
    return ResultAsync.fromPromise(
        knex.select<SQLiteDatasetItem[]>()
            .from("dataset_item")
            .whereIn("dataset_id", datasetIds)
            .whereNotIn("id", exclusionIds)
            .then(res => {
                return res.map(item => {
                    const { values_string, ...rest} = item;
                    return {
                        values: JSON.parse(values_string),
                        ...rest
                    };
                });
            }), 
        () => new SystemError()
    );
};