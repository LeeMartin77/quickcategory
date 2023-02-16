import { AnonAccessParameter, GQLContext } from "../../types";
import { canAccessDataset } from "../utilities/accessCheck";
import { randomUUID } from "node:crypto";
import { ok } from "neverthrow";
import { addCategorisationKey } from "./addCategorisationKey";

jest.mock("../utilities/accessCheck");

describe("addCategorisaionKey", () => {
    test("Happy Path", async () => {
        const args = {
            access: { whoami: "fakeaccess" } as unknown as AnonAccessParameter["access"],
            datasetId: "fake-dataset-id",
            label: randomUUID(),
        };

        const mockCanAccess = canAccessDataset as 
            jest.MockedFunction<typeof canAccessDataset>;
        mockCanAccess.mockResolvedValue(
            { id: randomUUID(), dataset_id: args.datasetId }
        );

        const createdId = randomUUID();

        const storeCategorisationKey = jest.fn().mockResolvedValue(
            ok(createdId)
        );
        const fakeContext = {
            dataSources: {
                storage: {
                    storage: {
                        datasetCategorisationKey: {
                            storeCategorisationKey
                        },
                    }
                }
            }
        } as unknown as GQLContext;

        // eslint-disable-next-line max-len
        const res = await addCategorisationKey({}, args, fakeContext);

        expect(mockCanAccess)
            .toBeCalledWith(
                fakeContext.dataSources.storage,
                args.access, 
                args.datasetId
            );
        expect(storeCategorisationKey).toBeCalledWith(
            {
                dataset_id: args.datasetId,
                label: args.label
            }
        );
        expect(res).toEqual({
            dataset_id: args.datasetId,
            id: createdId,
            label: args.label
        });
    });
});