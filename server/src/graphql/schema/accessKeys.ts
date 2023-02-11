export default `#graphql
type DataSetAdminKey {
    dataset_id: String!
    id: String!
    data_set: DataSet!
}
type DataSetCategorisationKey {
    dataset_id: String!
    id: String!
    label: String!
}

type Query {
    datasetAdminKey(accessId: String!, accessSecret: String!): DataSetAdminKey!
}

type Mutation {
    """Relies on pulling admin id and secret from headers"""
    addCategorisationKey(accessId: String!, accessSecret: String! datasetId: String!, label: String!): DataSetCategorisationKey!
    updateCategorisationKey(accessId: String!, accessSecret: String! datasetId: String!, id: String!, label: String!): DataSetCategorisationKey!
    deleteCategorisationKey(accessId: String!, accessSecret: String! datasetId: String!, id: String!): Boolean!
}
`;
