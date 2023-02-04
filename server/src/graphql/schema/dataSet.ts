export default `#graphql
type DataSet {
    id: String!
    name: String!
    item_type_keys: [String!]!
    item_labels: [String!]!
    categories: [DataSetCategory!]!
    item_count: Int!
}
type DataSetCategory {
    dataset_id: String!
    id: String!
    name: String!
}

type CreateDataSetResponse {
    id: String!
    accessId: String!
    accessSecret: String!
}

type Mutation {
    createDataset(name: String!, itemWidth: Int!, itemTypeKeys: [String!], itemLabels: [String!]): CreateDataSetResponse!
    
    """Relies on pulling admin id and secret from headers"""
    addDatasetCategory(dataset_id: String!, categoryName: String!): DataSetCategory!
    updateDatasetCategory(dataset_id: String!, id: String!, categoryName: String!): DataSetCategory!
    deleteDatasetCategory(dataset_id: String!, categoryName: String!): Boolean!
}
`