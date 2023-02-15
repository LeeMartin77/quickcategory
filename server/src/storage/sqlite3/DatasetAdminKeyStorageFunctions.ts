import { Knex } from "knex";
import { knexInstance } from ".";
import * as DAK from "../types/DatasetAdminKey";
import { SystemError, ValidationError } from "../types/StorageErrors";
import { randomUUID } from "crypto";
import { ResultAsync, errAsync } from "neverthrow";
import { isValidAdminKey as isValidStoreAdminKey } from "../validation/DatasetAdminKeyValidation";

export const storeAdminKey: DAK.StoreDatasetAdminKey = (
    key,
    knex: Knex = knexInstance
) => {
    if (!isValidStoreAdminKey(key)) {
        return errAsync(new ValidationError());
    }
    const newKey = { id: randomUUID(), ...key };
    return ResultAsync.fromPromise(knex.insert(newKey).into("dataset_admin_key").then(() => {
        return newKey.id;
    }), () => new SystemError());
};
export const deleteAdminKey: DAK.DeleteDatasetAdminKey = (
    datasetId,
    knex: Knex = knexInstance
) => {
    return ResultAsync.fromPromise(knex.delete().from("dataset_admin_key").where("dataset_id", datasetId).then(() => {
        return true;
    }), () => new SystemError());
};
export const readAdminKey: DAK.RetreiveDatasetAdminKey = (
    ids,
    knex: Knex = knexInstance
) => {
    return ResultAsync.fromPromise(knex.select<DAK.DatasetAdminKey[]>().from("dataset_admin_key").whereIn("id", ids)
        .then(res => {
            return res;
        }), () => new SystemError()
    );
};