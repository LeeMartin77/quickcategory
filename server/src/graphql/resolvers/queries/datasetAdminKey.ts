import { AnonAccessParameter, GQLContext } from "../../types";
import { canAccessDataset } from "../utilities/accessCheck";

export const datasetAdminKey = async (
    _: object, 
    { access }: AnonAccessParameter, 
    { dataSources: { storage }}: GQLContext
) => {
    return canAccessDataset(storage, access);
};