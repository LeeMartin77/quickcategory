import { configs } from "./_testConfigs";
import { randomUUID } from "crypto";
import { isNotFoundError } from "./types/StorageErrors";
import { StoreDatasetAdminKey } from "./types/DatasetAdminKey";
describe.each(configs)(
  "$name DatasetAdminKey Storage Tests",
  ({ config }) => {
    let testClient: any;
    beforeAll(async () => {
      testClient = await config.beforeAllSetup();
    });
    afterAll(async () => {
      await config.afterAllTeardown(testClient);
    });
    test("Happy Path :: Creates, Reads, Deletes", async () => {
      const startRes = await config.storage.datasetAdminKey.readAdminKey(randomUUID(), testClient);
      expect(isNotFoundError(startRes._unsafeUnwrapErr())).toBeTruthy();
      const fakeKey: Parameters<StoreDatasetAdminKey>[0] = {
        dataset_id: randomUUID(),
        hashed_admin_secret: randomUUID(),
        admin_secret_salt: randomUUID()
      }

      const storedIdRes = await config.storage.datasetAdminKey.storeAdminKey(fakeKey, testClient);
      expect(storedIdRes.isOk()).toBeTruthy()
      const storedId = storedIdRes._unsafeUnwrap()
      const storedRes = await config.storage.datasetAdminKey.readAdminKey(storedId, testClient);
      expect(storedRes.isOk()).toBeTruthy()
      const stored = storedRes._unsafeUnwrap()
      expect(stored).toEqual({ id: storedId, ...fakeKey});

      expect((await config.storage.datasetAdminKey.deleteAdminKey(stored.dataset_id, testClient)).isOk()).toBeTruthy();

      const endRes = await config.storage.datasetAdminKey.readAdminKey(storedId, testClient);
      expect(isNotFoundError(startRes._unsafeUnwrapErr())).toBeTruthy();
    })
  }
);
