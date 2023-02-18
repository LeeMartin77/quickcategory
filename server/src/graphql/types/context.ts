import { ApplicationState } from "../../state";
import { StorageDatasource } from "../datasources/StorageDatasource";

export type GQLContext = {
    dataSources: {
      storage: StorageDatasource;
    };
    state: ApplicationState;
    token: string;
  };