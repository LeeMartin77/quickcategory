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
    """Relies on pulling admin key and secret from headers"""
    datasetAdminKey: DataSetAdminKey!
}

type Mutation {
    """Relies on pulling admin id and secret from headers"""
    addCategorisationKey(dataset_id: String!, label: String!): DataSetCategorisationKey!
    updateCategorisationKey(dataset_id: String!, id: String!, label: String!): DataSetCategorisationKey!
    deleteCategorisationKey(dataset_id: String!, id: String!): Boolean!
}
`