import { StorageType } from "./interfaces";
import { sqlite3 } from "./sqlite3";

export interface StorageDrivers {
  [key: string]: StorageType;
}

const AVAILABLE_STORAGES: StorageDrivers = {
  sqlite3,
};

let setupStorage = AVAILABLE_STORAGES.sqlite3;

switch (process.env.QUICKCATEGORY_STORAGE_PROVIDER) {
  case "sqlite3":
    setupStorage = AVAILABLE_STORAGES.sqlite3;
  case undefined:
    break;
  default:
    throw new Error("Not Implemented");
}

export const STORAGE = setupStorage;
