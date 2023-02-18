import { GQLContext } from "../../types";
import { randomUUID } from "node:crypto";
import { categoriseItem } from "./categoriseItem";

describe("getItemToCategorise", () => {
    test("Key not found - throws GQL Exception", async () => {
        const categorisationKeyId = randomUUID();
        const args = {
            categorisationKeyId,
            itemId: randomUUID(),
            categoryKey: randomUUID()
        };

        const getDatasetCategorisationKeyForId =
            jest.fn().mockResolvedValue(undefined);
        const fakeContext = {
            dataSources: {
                storage: {
                    getDatasetCategorisationKeyForId,
                    storage: {
                    }
                }
            },
            state: {
                itemCategorisation: undefined
            }
        } as unknown as GQLContext;

        // eslint-disable-next-line max-len
        expect(categoriseItem({}, args, fakeContext))
            .rejects.toThrow("Invalid Categorisation Key");
    });
    test.each([undefined, "locked-in-item"])("Key found but item not in state - throws GQL Exception", async (res) => {
        const categorisationKeyId = randomUUID();
        const dataset_id = randomUUID();
        const args = {
            categorisationKeyId,
            itemId: randomUUID(),
            categoryKey: randomUUID()
        };

        const getDatasetCategorisationKeyForId =
            jest.fn().mockResolvedValue({
                id: categorisationKeyId,
                dataset_id
            });
        
        const getItemIdBeingCategorisedByCategorisationKey =
            jest.fn().mockResolvedValue(res);

        const fakeContext = {
            dataSources: {
                storage: {
                    getDatasetCategorisationKeyForId,
                    storage: {
                    }
                }
            },
            state: {
                itemCategorisation: {
                    getItemIdBeingCategorisedByCategorisationKey
                }
            }
        } as unknown as GQLContext;

        // eslint-disable-next-line max-len
        expect(categoriseItem({}, args, fakeContext))
            .rejects.toThrow("Invalid Item Id");
    });
    test("Category not found - throws GQL Exception", async () => {
        const categorisationKeyId = randomUUID();
        const dataset_id = randomUUID();
        const args = {
            categorisationKeyId,
            itemId: randomUUID(),
            categoryKey: randomUUID()
        };

        const getDatasetCategorisationKeyForId =
            jest.fn().mockResolvedValue({
                id: categorisationKeyId,
                dataset_id
            });
        
        const getItemIdBeingCategorisedByCategorisationKey =
            jest.fn().mockResolvedValue(args.itemId);

        const getDatasetCategoriesForDatasetId =
            jest.fn().mockResolvedValue([]);

        const fakeContext = {
            dataSources: {
                storage: {
                    getDatasetCategorisationKeyForId,
                    getDatasetCategoriesForDatasetId,
                    storage: {
                    }
                }
            },
            state: {
                itemCategorisation: {
                    getItemIdBeingCategorisedByCategorisationKey
                }
            }
        } as unknown as GQLContext;

        // eslint-disable-next-line max-len
        expect(categoriseItem({}, args, fakeContext))
            .rejects.toThrow("Invalid Category Id");
    });
    test("All checks pass :: saves categorisation and clears", async () => {
        const categorisationKeyId = randomUUID();
        const dataset_id = randomUUID();
        const args = {
            categorisationKeyId,
            itemId: randomUUID(),
            categoryKey: randomUUID()
        };

        const getDatasetCategorisationKeyForId =
            jest.fn().mockResolvedValue({
                id: categorisationKeyId,
                dataset_id
            });
        
        const getItemIdBeingCategorisedByCategorisationKey =
            jest.fn().mockResolvedValue(args.itemId);

        const getDatasetCategoriesForDatasetId =
            jest.fn().mockResolvedValue([
                {
                    key: args.categoryKey
                }
            ]);
        
        const clearItemIdBeingCategorisedByCategorisationKey =
            jest.fn();

        const storeCategorisation = jest.fn();

        const fakeContext = {
            dataSources: {
                storage: {
                    getDatasetCategorisationKeyForId,
                    getDatasetCategoriesForDatasetId,
                    storage: {
                        datasetItemCategorisation: {
                            storeCategorisation
                        }
                    }
                }
            },
            state: {
                itemCategorisation: {
                    getItemIdBeingCategorisedByCategorisationKey,
                    clearItemIdBeingCategorisedByCategorisationKey
                }
            }
        } as unknown as GQLContext;

        // eslint-disable-next-line max-len
        const res = await categoriseItem({}, args, fakeContext);
        expect(res.success).toBeTruthy();

        expect(clearItemIdBeingCategorisedByCategorisationKey)
            .toBeCalledWith(dataset_id, args.categorisationKeyId);
        expect(storeCategorisation)
            .toBeCalledWith({
                dataset_id,
                category_key: args.categoryKey,
                item_id: args.itemId,
                key_id: categorisationKeyId
            });
    });
});