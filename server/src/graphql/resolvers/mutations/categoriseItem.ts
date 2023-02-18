import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";
import { GQLContext } from "../../types";

type GetItemToCategoriseArgs = {
    categorisationKeyId: string
    itemId: string,
    categoryId: string
};

export const categoriseItem = async (
    _: object,
    { categorisationKeyId, itemId, categoryId }: GetItemToCategoriseArgs,
    { dataSources: { storage }, state: { itemCategorisation }}: GQLContext
): Promise<{ success: boolean }> => {
    const catKey = await storage
        .getDatasetCategorisationKeyForId(categorisationKeyId);
    if (!catKey)
        throw new GraphQLError("Invalid Categorisation Key", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
    if (await itemCategorisation
        .getItemIdBeingCategorisedByCategorisationKey(
            catKey.dataset_id,
            categorisationKeyId
        )
        !== itemId)
        throw new GraphQLError("Invalid Item Id", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
    const categories = await storage
        .getDatasetCategoriesForDatasetId(catKey.dataset_id);
    if (!categories.some(x => x.key === categoryId))
        throw new GraphQLError("Invalid Category Id", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
    await itemCategorisation.clearItemIdBeingCategorisedByCategorisationKey(
        catKey.dataset_id,
        categorisationKeyId
    );
    await storage.storage.datasetItemCategorisation.storeCategorisation({
        dataset_id: catKey.dataset_id,
        category_key: categoryId,
        item_id: itemId,
        key_id: catKey.id
    });
    return { success: true };
};