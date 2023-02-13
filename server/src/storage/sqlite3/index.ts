import knex, { Knex } from "knex";
import { StorageType } from "../interfaces";
import * as datasetAdminKey from "./DatasetAdminKeyStorageFunctions";

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
        `CREATE TABLE IF NOT EXISTS dataset_admin_key 
  (
    dataset_id TEXT, --UUID 
    id TEXT,
    hashed_admin_secret TEXT,
    admin_secret_salt TEXT
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
    datasetAdminKey
};
