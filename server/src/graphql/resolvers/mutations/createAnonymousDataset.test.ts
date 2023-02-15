import { ok } from "neverthrow";
import { createHash } from "node:crypto";
import { GQLContext } from "../../types";
import { createAnonymousDataset } from "./createAnonymousDataset";

describe("createAnonymousDataset", () => {
    test("Happy Path", async () => {
        const retDatasetId = "some-dataset-id";
        const retAdminKeyId = "some-admin-key-id";

        const storeDataset = jest.fn()
            .mockResolvedValue(ok(retDatasetId));
        const storeAdminKey = jest.fn()
            .mockResolvedValue(ok(retAdminKeyId));
        const fakeContext = {
            dataSources: {
                storage: {
                    storage: {
                        dataset: {
                            storeDataset
                        },
                        datasetAdminKey: {
                            storeAdminKey
                        },
                    }
                }
            }
        } as unknown as GQLContext;
        const args = {
            itemWidth: 2,
            name: "Some Dataset Name",
            itemLabels: ["label one", "label two"],
            itemTypeKeys: ["string", "date"]
        };
        
        const {accessId, accessSecret, id} = await createAnonymousDataset({}, args, fakeContext);

        expect(storeDataset).toBeCalledWith({
            name: args.name,
            item_type_keys: args.itemTypeKeys
                .map((value, index) => ({ index, value })),
            item_labels: args.itemLabels
                .map((value, index) => ({ index, value }))
        });
        expect(storeAdminKey).toBeCalledWith({
            dataset_id: retDatasetId,
            hashed_admin_secret: expect.any(String),
            admin_secret_salt: expect.any(String)
        });

        expect(id).toBe(retDatasetId);
        expect(accessId).toBe(retAdminKeyId);

        const salt = storeAdminKey.mock.calls[0][0].admin_secret_salt;

        expect(storeAdminKey.mock.calls[0][0].hashed_admin_secret)
            .toBe(createHash("sha3-256").update(accessSecret + salt).digest("base64"));
    });
});