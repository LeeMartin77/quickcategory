import { AnonAccessParameter, GQLContext } from "../../types";
import { addDatasetItems } from "./addDatasetItems";
import { canAccessDataset } from "../utilities/accessCheck";
import { randomUUID } from "node:crypto";
import { ok } from "neverthrow";
import { storageItemsToGqlItems } from "../utilities/gqlDatasetItemFromStorage";

jest.mock("../utilities/accessCheck");

describe("addDatasetItems", () => {
    test("Happy Path", async () => {
        const saveItems = [
            { value: ["val0-0", "val0-1"]},
            { value: ["val1-0", "val1-1"]}
        ];
        const args = {
            access: { whoami: "fakeaccess" } as unknown as AnonAccessParameter["access"],
            datasetId: "fake-dataset-id",
            items: saveItems
        };

        const mockCanAccess = canAccessDataset as 
            jest.MockedFunction<typeof canAccessDataset>;
        mockCanAccess.mockResolvedValue(
            { id: randomUUID(), dataset_id: args.datasetId }
        );

        const storageResponse = args.items.map(item => {
            return {
                id: randomUUID(),
                dataset_id: args.datasetId,
                values: item.value.map((value, index) => ({ index, value }))
            };
        });

        const storeItems = jest.fn().mockResolvedValue(
            ok(storageResponse)
        );
        const fakeContext = {
            dataSources: {
                storage: {
                    storage: {
                        datasetItem: {
                            storeItems
                        },
                    }
                }
            }
        } as unknown as GQLContext;

        // eslint-disable-next-line max-len
        const res = await addDatasetItems({}, args, fakeContext);

        expect(mockCanAccess)
            .toBeCalledWith(
                fakeContext.dataSources.storage,
                args.access, 
                args.datasetId
            );
        expect(storeItems).toBeCalledWith(
            args.items.map(item => {
                return {
                    dataset_id: args.datasetId,
                    values: item.value.map((value, index) => ({ index, value }))
                };
            })
        );
        expect(res).toEqual(storageItemsToGqlItems(storageResponse));
    });
});