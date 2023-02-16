import { GraphQLError } from "graphql";
import { hashWithSalt } from "../../../utilities";
import { GQLContext } from "../../types";
import { ApolloServerErrorCode } from "@apollo/server/errors";

type QueryDatasetAdminKeyArgs = {
    access: {
        accessId: string,
        accessSecret: string
    }
}

// eslint-disable-next-line max-len
export const datasetAdminKey = async (_: object, 
    { access: { accessId, accessSecret }}: QueryDatasetAdminKeyArgs, 
    { dataSources: { storage }}: GQLContext
) => {
    const { 
        id, 
        dataset_id, 
        hashed_admin_secret, 
        admin_secret_salt 
    } = await storage.getDatasetAdminKeyForId(accessId);
    if (hashWithSalt(accessSecret, admin_secret_salt) !== hashed_admin_secret) {
        throw new GraphQLError("Invalid Data Access", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
    }
    return { id, dataset_id };
};