import { Knex } from "knex";
import { knexInstance } from ".";
import { DatasetAdminKey, DeleteDatasetAdminKey, RetreiveDatasetAdminKey, StoreDatasetAdminKey } from "../types/DatasetAdminKey";
import { NotFoundError, SystemError, isNotFoundError } from "../types/StorageErrors";
import { randomUUID } from "crypto";
import { ResultAsync } from "neverthrow";

export const storeAdminKey: StoreDatasetAdminKey = (key, knex: Knex = knexInstance) => {
    const newKey = { id: randomUUID(), ...key }
    return ResultAsync.fromPromise(knex.insert(newKey).into("dataset_admin_key").then(() => {
        return newKey.id
    }), () => new SystemError())
};
export const deleteAdminKey: DeleteDatasetAdminKey = (datasetId, knex: Knex = knexInstance) => {
    return ResultAsync.fromPromise(knex.delete().from("dataset_admin_key").where("dataset_id", datasetId).then(() => {
        return true
    }), () => new SystemError())
};
export const readAdminKey: RetreiveDatasetAdminKey = (id, knex: Knex = knexInstance) => {
    return ResultAsync.fromPromise(knex.select<DatasetAdminKey>().from("dataset_admin_key").where("id", id).first()
    .then(res => {
        if (!res) {
            throw new NotFoundError();
        }
        return res;
    }), (err) => {
        if (isNotFoundError(err)) {
            return err;
        }
        return new SystemError()
    })
};