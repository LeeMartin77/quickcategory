import { AnonAccessParameter, GQLContext } from "../../types";
import { canAccessDataset } from "../utilities/accessCheck";
import { randomUUID } from "node:crypto";
import { ok } from "neverthrow";
import { addDatasetCategory } from "./addDatasetCategory";

jest.mock("../utilities/accessCheck");

describe("addDatasetCategory", () => {
    test("Happy Path", async () => {
        const args = {
            access: { whoami: "fakeaccess" } as unknown as AnonAccessParameter["access"],
            datasetId: "fake-dataset-id",
            categoryKey: randomUUID(),
            categoryName: randomUUID()
        };

        const mockCanAccess = canAccessDataset as 
            jest.MockedFunction<typeof canAccessDataset>;
        mockCanAccess.mockResolvedValue(
            { id: randomUUID(), dataset_id: args.datasetId }
        );

        const storeCategory = jest.fn().mockResolvedValue(
            ok(args.categoryKey)
        );
        const fakeContext = {
            dataSources: {
                storage: {
                    storage: {
                        datasetCategory: {
                            storeCategory
                        },
                    }
                }
            }
        } as unknown as GQLContext;

        // eslint-disable-next-line max-len
        const res = await addDatasetCategory({}, args, fakeContext);

        expect(mockCanAccess)
            .toBeCalledWith(
                fakeContext.dataSources.storage,
                args.access, 
                args.datasetId
            );
        expect(storeCategory).toBeCalledWith(
            {
                dataset_id: args.datasetId,
                key: args.categoryKey,
                name: args.categoryName
            }
        );
        expect(res).toEqual({
            dataset_id: args.datasetId,
            key: args.categoryKey,
            name: args.categoryName
        });
    });
});