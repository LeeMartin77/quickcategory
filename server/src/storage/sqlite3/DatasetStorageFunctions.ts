import { Knex } from "knex";
import { knexInstance } from ".";
import * as D from "../types/Dataset";
import { NotFoundError, SystemError, isNotFoundError, ValidationError } from "../types/StorageErrors";
import { randomUUID } from "crypto";
import { errAsync, ResultAsync } from "neverthrow";
import { isValidDataset, isValidDatasetUpdate } from "../validation/DatasetValidation";

type SQLiteDataset = {
    id: string;
    name: string;
    // This is because these values are stored/retrieved as json strings
    item_type_keys: string,
    item_labels: string
}

export const storeDataset: D.StoreDataset = (
    dataset,
    knex: Knex = knexInstance
) => {
    if (!isValidDataset(dataset)) {
        return errAsync(new ValidationError());
    }
    const { item_labels, item_type_keys, ...rest} = dataset;

    const newDataset: SQLiteDataset = { 
        id: randomUUID(),
        item_labels: JSON.stringify(item_labels),
        item_type_keys: JSON.stringify(item_type_keys),
        ...rest
    };
    return ResultAsync.fromPromise(knex.insert(newDataset).into("dataset").then(() => {
        return newDataset.id;
    }), () => new SystemError());
};

const stringifyable = ["item_labels", "item_type_keys"];

export const updateDataset: D.UpdateDataset = (
    id,
    updates,
    knex: Knex = knexInstance
) => {
    if (!isValidDatasetUpdate(updates)) {
        return errAsync(new ValidationError());
    }
    const partial = Object.entries(updates)
        .filter(u => u[1] != undefined)
        .reduce((acc, curr) => { 
            if (stringifyable.includes(curr[0])) {
                return { ...acc, [curr[0]]: JSON.stringify(curr[1])};
            }
            return { ...acc, [curr[0]]: curr[1]};
        }, {});
    return ResultAsync.fromPromise(knex("dataset").update(partial, ["id"]).where("id", id).then(() => {
        return id;
    }), () => new SystemError());
};

export const deleteDataset: D.DeleteDataset = (
    id,
    knex: Knex = knexInstance
) => {
    return ResultAsync.fromPromise(knex.delete().from("dataset").where("id", id).then(() => {
        return true;
    }), () => new SystemError());
};
export const readDataset: D.RetreiveDataset = (
    ids,
    knex: Knex = knexInstance
) => {
    return ResultAsync.fromPromise(knex.select<SQLiteDataset[]>().from("dataset").whereIn("id", ids)
        .then(allres => {
            return allres.map(res => {
                const { item_labels, item_type_keys, ...rest} = res;
                return {
                    item_labels: JSON.parse(item_labels),
                    item_type_keys: JSON.parse(item_type_keys),
                    ...rest
                };
            });
        }), () => new SystemError()
    );
};