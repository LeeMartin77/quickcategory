// This is tested as part of the admin key query
// Look at specific testing?

import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";
import { hashWithSalt } from "../../../utilities";
import { StorageDatasource } from "../../datasources/StorageDatasource";

export const canAccessDataset = async (
    storage: StorageDatasource,
    { accessId, accessSecret }: {
        accessId: string,
        accessSecret: string
    },
    check_dataset_id?: string
) => {
    const { 
        id, 
        dataset_id, 
        hashed_admin_secret, 
        admin_secret_salt 
    } = await storage.getDatasetAdminKeyForId(accessId);
    if (
        hashWithSalt(accessSecret, admin_secret_salt) !== hashed_admin_secret
        || (check_dataset_id !== undefined && dataset_id !== check_dataset_id)
    ) {
        throw new GraphQLError("Invalid Data Access", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
    }
    return { id, dataset_id };
};


