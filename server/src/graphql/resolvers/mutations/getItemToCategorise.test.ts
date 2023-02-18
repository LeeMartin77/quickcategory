import { GQLContext } from "../../types";
import { randomUUID } from "node:crypto";
import { ok } from "neverthrow";
import { getItemToCategorise } from "./getItemToCategorise";
import { DatasetItem } from "../../../storage/types/DatasetItem";
import { storageItemToGqlItem } from "../utilities/gqlDatasetItemFromStorage";

jest.mock("../utilities/accessCheck");

describe("getItemToCategorise", () => {
    test("Key not found - throws GQL Exception", async () => {
        const categorisationKeyId = randomUUID();
        const args = {
            categorisationKeyId
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
        expect(getItemToCategorise({}, args, fakeContext))
            .rejects.toThrow("Invalid Categorisation Key");
    });
    test("Nothing in state :: gets uncategorised item", async () => {
        const categorisationKeyId = randomUUID();
        const dataset_id = randomUUID();
        const args = {
            categorisationKeyId
        };

        const getDatasetCategorisationKeyForId =
            jest.fn().mockResolvedValue({
                id: categorisationKeyId,
                dataset_id
            });

        const getItemIdBeingCategorisedByCategorisationKey =
            jest.fn().mockResolvedValue(undefined);

        const getDatasetItemCategorisationsForDatasetId =
            jest.fn().mockResolvedValue([]);
        
        const setItemIdBeingCategorisedByCategorisationKey =
            jest.fn();

        const datasetItems: DatasetItem[] =
            [
                {
                    id: randomUUID(),
                    dataset_id,
                    values: [
                        { index: 0, value: "something" }
                    ]
                }
            ];
        const readItemsExcept =
            jest.fn().mockResolvedValue(ok(datasetItems));

        const fakeContext = {
            dataSources: {
                storage: {
                    getDatasetCategorisationKeyForId,
                    getDatasetItemCategorisationsForDatasetId,
                    storage: {
                        datasetItem: {
                            readItemsExcept
                        }
                    }
                }
            },
            state: {
                itemCategorisation: {
                    getItemIdBeingCategorisedByCategorisationKey,
                    setItemIdBeingCategorisedByCategorisationKey
                }
            }
        } as unknown as GQLContext;

        // eslint-disable-next-line max-len
        const res = await getItemToCategorise({}, args, fakeContext);

        expect(getDatasetCategorisationKeyForId)
            .toBeCalledWith(categorisationKeyId);

        expect(getItemIdBeingCategorisedByCategorisationKey)
            .toBeCalledWith(dataset_id, categorisationKeyId);

        expect(getDatasetItemCategorisationsForDatasetId)
            .toBeCalledWith(dataset_id);

        expect(readItemsExcept)
            .toBeCalledWith([dataset_id], []);

        expect(setItemIdBeingCategorisedByCategorisationKey)
            .lastCalledWith(
                dataset_id,
                categorisationKeyId,
                datasetItems[0].id
            );
        
        expect(res).toEqual(storageItemToGqlItem(datasetItems[0]));
    });
    test("Item id in state :: returns that item item", async () => {
        const categorisationKeyId = randomUUID();
        const dataset_id = randomUUID();
        const item_id = randomUUID();
        const args = {
            categorisationKeyId
        };

        const getDatasetCategorisationKeyForId =
            jest.fn().mockResolvedValue({
                id: categorisationKeyId,
                dataset_id
            });

        const getItemIdBeingCategorisedByCategorisationKey =
            jest.fn().mockResolvedValue(item_id);


        const datasetItem: DatasetItem =
            {
                id: item_id,
                dataset_id,
                values: [
                    { index: 0, value: "something" }
                ]
            };

        const readItemsById = jest.fn()
            .mockResolvedValue(ok([datasetItem]));

        const fakeContext = {
            dataSources: {
                storage: {
                    getDatasetCategorisationKeyForId,
                    storage: {
                        datasetItem: {
                            readItemsById
                        }
                    }
                }
            },
            state: {
                itemCategorisation: {
                    getItemIdBeingCategorisedByCategorisationKey,
                }
            }
        } as unknown as GQLContext;

        // eslint-disable-next-line max-len
        const res = await getItemToCategorise({}, args, fakeContext);

        expect(getDatasetCategorisationKeyForId)
            .toBeCalledWith(categorisationKeyId);

        expect(getItemIdBeingCategorisedByCategorisationKey)
            .toBeCalledWith(dataset_id, categorisationKeyId);

        expect(readItemsById)
            .toBeCalledWith(dataset_id, [item_id]);

        
        expect(res).toEqual(storageItemToGqlItem(datasetItem));
    });
});