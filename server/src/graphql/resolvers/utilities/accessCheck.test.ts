import { randomUUID } from "crypto";
import { hashWithSalt } from "../../../utilities";
import { StorageDatasource } from "../../datasources/StorageDatasource";
import { canAccessDataset } from "./accessCheck";

describe("canAccessDataset", () => {

    const id = randomUUID();
    const dataset_id = randomUUID();
    const test_access_id = randomUUID();
    const test_secret = randomUUID();
    const admin_secret_salt = randomUUID();
    const hashed_admin_secret = 
        hashWithSalt(test_secret, admin_secret_salt);

    const mockStorage = {
        getDatasetAdminKeyForId: jest.fn().mockResolvedValue(
            { 
                id, 
                dataset_id, 
                hashed_admin_secret, 
                admin_secret_salt 
            }
        )
    } as unknown as StorageDatasource;
    describe("Access Granted", () => {
        test("Returns values without check value", () => {
            expect(canAccessDataset(mockStorage, {
                accessId: test_access_id,
                accessSecret: test_secret
            })).resolves.toEqual({
                id,
                dataset_id
            });
            expect(mockStorage.getDatasetAdminKeyForId)
                .toBeCalledWith(test_access_id);
        });
        test("Returns values with check value", () => {
            expect(canAccessDataset(mockStorage, {
                accessId: test_access_id,
                accessSecret: test_secret
            }, dataset_id)).resolves.toEqual({
                id,
                dataset_id
            });
            expect(mockStorage.getDatasetAdminKeyForId)
                .toBeCalledWith(test_access_id);
        });
    });
    describe("Access Denied", () => {
        test("Failed check value", () => {
            expect(canAccessDataset(mockStorage, {
                accessId: test_access_id,
                accessSecret: test_secret
            }, "totally-wrong")).rejects.toThrow("Invalid Data Access");
            expect(mockStorage.getDatasetAdminKeyForId)
                .toBeCalledWith(test_access_id);
        });
        test("Failed secret", () => {
            expect(canAccessDataset(mockStorage, {
                accessId: test_access_id,
                accessSecret: "definitely wrong secret"
            })).rejects.toThrow("Invalid Data Access");
            expect(mockStorage.getDatasetAdminKeyForId)
                .toBeCalledWith(test_access_id);
        });
        test("No admin key found for id", () => {

            const emptyMockStorage = {
                getDatasetAdminKeyForId: jest.fn()
                    .mockResolvedValue(undefined)
            } as unknown as StorageDatasource;
            expect(canAccessDataset(emptyMockStorage, {
                accessId: test_access_id,
                accessSecret: test_secret
            })).rejects.toThrow("Invalid Data Access");
            expect(mockStorage.getDatasetAdminKeyForId)
                .toBeCalledWith(test_access_id);
        });
    });
});