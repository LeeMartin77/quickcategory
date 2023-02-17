import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { randomUUID } from "crypto";



describe("Create Dataset e2e", () => {
    test("Happy Path: Create then read a dataset", async () => {

        const client = new ApolloClient({
            uri: process.env.QUICKCATEGORY_E2E_ENDPOINT ?? "http://localhost:3012/api/graphql",
            cache: new InMemoryCache(),
        });

        const creationVariables =  {
            name: "My Dataset " + randomUUID(),
            itemTypeKeys: ["string"],
            itemLabels: ["Some Label"]
        };

        const { data, errors } = await client.mutate({
            mutation: gql`
                mutation CreateAnonymousDataset($name: String!, $itemTypeKeys: [String!]!, $itemLabels: [String!]!) {
                    createAnonymousDataset(name: $name, itemTypeKeys: $itemTypeKeys, itemLabels: $itemLabels) {
                        accessId
                        accessSecret
                        id
                    }
                }
            `,
            variables: creationVariables
        });

        expect(data).not.toBeUndefined();
        expect(errors).toBeUndefined();

        expect(data.createAnonymousDataset.accessId).toBeTruthy();
        expect(data.createAnonymousDataset.accessSecret).toBeTruthy();

        type CreationResponse = { 
            __typename: string,
            id: string,
            accessId: string, 
            accessSecret: string 
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {__typename, id: dataset_id, ...access}: CreationResponse =
            data.createAnonymousDataset;

        const extraDataVariables = {
            access,
            datasetId: dataset_id,
            categoryKey: "some-cat-key",
            categoryName: "Some Category Name",
            categorisationLabel: "Some Categorisation Label",
            items: [{ value: ["Something"]}]
        };
        
        const { data: extraData, errors: extraErrors } = await client.mutate({
            mutation: gql`
                    mutation CreateDatasetData(
                        $access: DatasetAdminKeyInput!
                        $datasetId: String!
                        $categoryKey: String!
                        $categoryName: String!
                        $categorisationLabel: String!
                        $items: [DatasetItemInput!]!
                    ) {
                        addDatasetCategory(
                            access: $access,
                            datasetId: $datasetId,
                            categoryKey: $categoryKey,
                            categoryName: $categoryName
                        ) {
                            key
                            name
                        }
                        addCategorisationKey(
                            access: $access,
                            datasetId: $datasetId,
                            label: $categorisationLabel,
                        ) {
                            id
                        }
                        addDatasetItems(
                            access: $access,
                            datasetId: $datasetId,
                            items: $items
                        ) {
                            id
                        }
                    }
                `,
            variables: extraDataVariables
        });
    
        expect(extraData).not.toBeUndefined();
        expect(extraErrors).toBeUndefined();


        const { data: readData, errors: readErrors } = await client.query({
            query: gql`
                query DatasetAdminKey($access: DatasetAdminKeyInput!) {
                    datasetAdminKey(access: $access) {
                        data_set {
                            id,
                            name,
                            categories {
                                key,
                                name
                            }
                            categorisation_keys {
                                label
                            }
                            items {
                                value
                            }
                        }
                    }
                }
            `,
            variables: {
                access
            }
        });

        expect(readData).not.toBeUndefined();
        expect(readErrors).toBeUndefined();

        expect(readData.datasetAdminKey.data_set.id).toBeTruthy();
        expect(readData.datasetAdminKey.data_set.name)
            .toBe(creationVariables.name);
        
        expect(readData.datasetAdminKey.data_set.categories[0].key)
            .toBe(extraDataVariables.categoryKey);
        expect(readData.datasetAdminKey.data_set.categorisation_keys[0].label)
            .toBe(extraDataVariables.categorisationLabel);
        expect(readData.datasetAdminKey.data_set.items[0].value)
            .toEqual(extraDataVariables.items[0].value);
    });
});