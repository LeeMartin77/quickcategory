import { StorageDatasource } from "../datasources/StorageDatasource";

export type GQLContext = {
    dataSources: {
      storage: StorageDatasource;
    };
    token: string;
  };