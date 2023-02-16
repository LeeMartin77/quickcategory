import { randomUUID } from "crypto";
import { DatasetAdminKey } from "../../../storage/types/DatasetAdminKey";
import { hashWithSalt } from "../../../utilities";
import { GQLContext } from "../../types";
import { datasetAdminKey } from "./datasetAdminKey";
import { GraphQLError } from "graphql";

describe("datasetAdminKey", () => {
    test("Happy Path", async () => {
        const fakeSecret = "this-is-my-secret";
        const fakeSalt = "this-is-my-fake-salt";
        
        const fakeAdminKey: DatasetAdminKey = {
            dataset_id: randomUUID(),
            id: randomUUID(),
            hashed_admin_secret: hashWithSalt(fakeSecret, fakeSalt),
            admin_secret_salt: fakeSalt
        };

        const retreiveAdminKey = jest.fn()
            .mockResolvedValue(fakeAdminKey);
        const fakeContext = {
            dataSources: {
                storage: {
                    getDatasetAdminKeyForId: retreiveAdminKey
                }
            }
        } as unknown as GQLContext;

        // act
        const result = await datasetAdminKey({}, {
            access: {
                accessId: fakeAdminKey.id,
                accessSecret: fakeSecret
            }
        }, fakeContext);
        expect(retreiveAdminKey).toBeCalledWith(fakeAdminKey.id);
        expect(result).toEqual({ 
            id: fakeAdminKey.id, 
            dataset_id: fakeAdminKey.dataset_id 
        });
    });
    test("Throws error on wrong secret", async () => {
        const fakeSecret = "this-is-my-secret";
        const fakeSalt = "this-is-my-fake-salt";
        
        const fakeAdminKey: DatasetAdminKey = {
            dataset_id: randomUUID(),
            id: randomUUID(),
            hashed_admin_secret: hashWithSalt(fakeSecret, fakeSalt),
            admin_secret_salt: fakeSalt
        };

        const retreiveAdminKey = jest.fn()
            .mockResolvedValue(fakeAdminKey);
        const fakeContext = {
            dataSources: {
                storage: {
                    getDatasetAdminKeyForId: retreiveAdminKey
                }
            }
        } as unknown as GQLContext;

        // act
        expect(datasetAdminKey({}, {
            access: {
                accessId: fakeAdminKey.id,
                accessSecret: "wrong-secret"
            }
        }, fakeContext)).rejects.toThrow("Invalid Data Access");
        expect(retreiveAdminKey).toBeCalledWith(fakeAdminKey.id);
    });
});