import * as sqlite3 from "./sqlite3";
import knex from "knex";

export const configs = [
  {
    name: "sqlite3",
    config: {
      beforeAllSetup: async () => {
        const testClient = knex({
          ...sqlite3.DEFAULT_CLIENT_CONFIG,
          connection: { filename: ":memory:" },
        });
        await sqlite3.setupDatabase(testClient);
        return testClient;
      },
      afterAllTeardown: async (testClient: any) => {
        await testClient.destroy();
      },
      storage: sqlite3.sqlite3,
    },
  },
];
