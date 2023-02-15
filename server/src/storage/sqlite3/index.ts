import knex, { Knex } from "knex";
import { StorageType } from "../interfaces";
import * as dataset from "./DatasetStorageFunctions";
import * as datasetAdminKey from "./DatasetAdminKeyStorageFunctions";
import * as datasetCategorisationKey from "./DatasetCategorisationKeyStorageFunctions";
import * as datasetCategory from "./DatasetCategoryStorageFunctions";
import * as datasetItem from "./DatasetItemStorageFunctions";
import * as datasetItemCategorisation from "./DatasetItemCategorisationStorageFunctions";


export const DEFAULT_CLIENT_CONFIG: Knex.Config = {
    client: "better-sqlite3",
    connection: {
        filename: process.env.QUICKCATEGORY_SQLITE3_FILENAME ?? ".sqlite",
    },
    useNullAsDefault: true,
};

export const knexInstance = knex(DEFAULT_CLIENT_CONFIG);

export async function setupDatabase(knex: Knex = knexInstance) {
    const migrations = [
        `CREATE TABLE IF NOT EXISTS dataset 
        (
            id TEXT PRIMARY KEY, --UUID 
            name TEXT,
            item_type_keys TEXT,
            item_labels TEXT
        );`,
        `CREATE TABLE IF NOT EXISTS dataset_admin_key 
        (
            dataset_id TEXT PRIMARY KEY, --UUID 
            id TEXT, --UUID 
            hashed_admin_secret TEXT,
            admin_secret_salt TEXT
        );`,
        `CREATE TABLE IF NOT EXISTS dataset_categorisation_key 
        (
            id TEXT PRIMARY KEY, --UUID 
            dataset_id TEXT, --UUID 
            label TEXT
        );`,
        `CREATE TABLE IF NOT EXISTS dataset_category 
        (
            dataset_id TEXT, --UUID 
            key TEXT, --UUID 
            name TEXT
        );`,
        `CREATE TABLE IF NOT EXISTS dataset_item 
        (
            dataset_id TEXT, --UUID 
            id TEXT, --UUID 
            values_string TEXT
        );`,
        `CREATE TABLE IF NOT EXISTS dataset_item_categorisation 
        (
            dataset_id TEXT, --UUID 
            id TEXT, --UUID 
            category_key TEXT,
            item_id TEXT,
            key_id TEXT
        );`,
    ];
    for (const migration of migrations) {
        await knex.raw(migration);
    }
}

export async function shutdownDatabase(knex: Knex = knexInstance) {
    await knex.destroy();
}

export const sqlite3: StorageType = {
    //StorageType
    setupDatabase,
    shutdownDatabase,
    dataset,
    datasetAdminKey,
    datasetCategorisationKey,
    datasetCategory,
    datasetItem,
    datasetItemCategorisation
};
