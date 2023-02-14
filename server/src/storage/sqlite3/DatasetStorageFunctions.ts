import { Knex } from "knex";
import { knexInstance } from ".";
import * as D from "../types/Dataset";
import { NotFoundError, SystemError, isNotFoundError } from "../types/StorageErrors";
import { randomUUID } from "crypto";
import { ResultAsync } from "neverthrow";

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
    id,
    knex: Knex = knexInstance
) => {
    return ResultAsync.fromPromise(knex.select<SQLiteDataset>().from("dataset").where("id", id).first()
        .then(res => {
            if (!res) {
                throw new NotFoundError();
            }

            const { item_labels, item_type_keys, ...rest} = res;
            return {
                item_labels: JSON.parse(item_labels),
                item_type_keys: JSON.parse(item_type_keys),
                ...rest
            };
        }), (err) => {
        if (isNotFoundError(err)) {
            return err;
        }
        return new SystemError();
    });
};