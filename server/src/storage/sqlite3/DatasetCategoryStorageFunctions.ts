import { Knex } from "knex";
import { knexInstance } from ".";
import * as DC from "../types/DatasetCategory";
import { NotFoundError, SystemError, ValidationError } from "../types/StorageErrors";
import { errAsync, ResultAsync } from "neverthrow";
import { isValidCategory } from "../validation/DatasetCategoryValidation";

export const storeCategory: DC.StoreDatasetCategory = (
    category,
    knex: Knex = knexInstance
) => {
    if (!isValidCategory(category))
        return errAsync(new ValidationError());
    return ResultAsync.fromPromise(
        knex.insert(category)
            .into("dataset_category")
            .then(() => {
                return category.key;
            }), 
        () => new SystemError());
};
export const deleteCategory: DC.DeleteDatasetCategory = (
    datasetId,
    key,
    knex: Knex = knexInstance
) => {
    return ResultAsync.fromPromise(
        knex.delete().from("dataset_category")
            .where("dataset_id", datasetId)
            .andWhere("key", key)
            .then(() => {
                return true;
            }), 
        () => new SystemError());
};
export const readCategories: DC.RetreiveDatasetCategories = (
    datasetIds,
    knex: Knex = knexInstance
) => {
    return ResultAsync.fromPromise(
        knex.select<DC.DatasetCategory[]>()
            .from("dataset_category")
            .whereIn("dataset_id", datasetIds)
            .then(res => {
                return res;
            }), 
        () => new SystemError());
};