import { Knex } from "knex";
import { knexInstance } from ".";
import * as DCK from "../types/DatasetCategorisationKey";
import { NotFoundError, SystemError, ValidationError, isNotFoundError } from "../types/StorageErrors";
import { randomUUID } from "crypto";
import { ResultAsync, errAsync } from "neverthrow";
import { isValidCategorisationKey } from "../validation/DatasetCategorisationKeyValidation";

export const storeCategorisationKey: DCK.StoreDatasetCategorisationKey = (
    key,
    knex: Knex = knexInstance
) => {
    if (!isValidCategorisationKey(key)) {
        return errAsync(new ValidationError());
    }
    const newKey = { id: randomUUID(), ...key };
    return ResultAsync.fromPromise(
        knex.insert(newKey)
            .into("dataset_categorisation_key")
            .then(() => {
                return newKey.id;
            }), 
        () => new SystemError());
};
export const deleteCategorisationKey: DCK.DeleteDatasetCategorisationKey = (
    datasetId,
    knex: Knex = knexInstance
) => {
    return ResultAsync.fromPromise(
        knex.delete().from("dataset_categorisation_key")
            .where("dataset_id", datasetId)
            .then(() => {
                return true;
            }), 
        () => new SystemError());
};
export const readCategorisationKey: DCK.RetreiveDatasetCategorisationKey = (
    id,
    knex: Knex = knexInstance
) => {
    return ResultAsync.fromPromise(
        knex.select<DCK.DatasetCategorisationKey>()
            .from("dataset_categorisation_key")
            .where("id", id)
            .first()
            .then(res => {
                if (!res) {
                    throw new NotFoundError();
                }
                return res;
            }), 
        (err) => {
            if (isNotFoundError(err)) {
                return err;
            }
            return new SystemError();
        });
};