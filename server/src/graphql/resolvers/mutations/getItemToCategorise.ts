import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";
import { GQLContext } from "../../types";
import { storageItemToGqlItem } from "../utilities/gqlDatasetItemFromStorage";

type GetItemToCategoriseArgs = {
    categorisationKeyId: string
};

export const getItemToCategorise = async (
    _: object,
    { categorisationKeyId }: GetItemToCategoriseArgs,
    { dataSources: { storage }, state: { itemCategorisation }}: GQLContext

) => {
    const catKey = await storage
        .getDatasetCategorisationKeyForId(categorisationKeyId);
    if (!catKey)
        throw new GraphQLError("Invalid Categorisation Key", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
    const { dataset_id, id } = catKey;
    const item = await itemCategorisation
        .getItemIdBeingCategorisedByCategorisationKey(
            dataset_id,
            id
        );
    if (item) {
        const wholeItem = await storage.storage
            .datasetItem.readItemsById(dataset_id, [item]);
        if (wholeItem.isErr())
            throw wholeItem.error;
        return storageItemToGqlItem(wholeItem.value[0]);
    }
    const alreadyCategorised = await storage
        .getDatasetItemCategorisationsForDatasetId(dataset_id);

    const availableItems = await storage
        .storage.datasetItem.readItemsExcept(
            [dataset_id], 
            alreadyCategorised.map(x => x.id)
        );
    if (availableItems.isErr())
        throw availableItems.error;
    
    if (availableItems.value.length === 0)
        return undefined;
    
    const randomItem = availableItems
        .value[Math.floor(Math.random() * availableItems.value.length)];
    
    await itemCategorisation.setItemIdBeingCategorisedByCategorisationKey(
        dataset_id,
        id,
        randomItem.id
    );

    return storageItemToGqlItem(randomItem);
};