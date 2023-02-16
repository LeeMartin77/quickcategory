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
                    }
                }
            `,
            variables: creationVariables
        });

        expect(data).not.toBeUndefined();
        expect(errors).toBeUndefined();

        expect(data.createAnonymousDataset.accessId).toBeTruthy();
        expect(data.createAnonymousDataset.accessSecret).toBeTruthy();

        type CreationResponse = { accessId: string, accessSecret: string };
        const { accessId, accessSecret }: CreationResponse =
            data.createAnonymousDataset;

        const { data: readData, errors: readErrors } = await client.query({
            query: gql`
                query DatasetAdminKey($access: DatasetAdminKeyInput!) {
                    datasetAdminKey(access: $access) {
                        data_set {
                            id,
                            name
                        }
                    }
                }
            `,
            variables: {
                access: {
                    accessId,
                    accessSecret
                }
            }
        });

        expect(readData).not.toBeUndefined();
        expect(readErrors).toBeUndefined();

        expect(readData.datasetAdminKey.data_set.id).toBeTruthy();
        expect(readData.datasetAdminKey.data_set.name)
            .toBe(creationVariables.name);
    });
});