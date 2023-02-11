export default `#graphql
type DataSet {
    id: String!
    name: String!
    value_info: [DataSetItemValueInfo!]!
    categories: [DataSetCategory!]!
    categorisations: [DataSetItemCategorisation!]!
    categorisation_keys: [DataSetCategorisationKey!]!
    """TODO: Will definitely need pagination"""
    items: [DataSetItem!]!
    item_count: Int!
}

type DataSetItemCategorisation {
    dataset_id: String!
    id: String!
    item_id: String!
    item: DataSetItem!
    key_id: String!
    """Can be nullable if key is deleted"""
    key: DataSetCategorisationKey
    category_id: String!
    """Can be nullable if category is deleted"""
    category: DataSetCategory
}

type DataSetItemValueInfo {
    index: Int!
    type: String!
    label: String!
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
    createAnonymousDataset(name: String!, itemWidth: Int!, itemTypeKeys: [String!], itemLabels: [String!]): CreateDataSetResponse!
    
    addDatasetCategory(accessId: String!, accessSecret: String! datasetId: String!, categoryName: String!): DataSetCategory!
    updateDatasetCategory(accessId: String!, accessSecret: String! datasetId: String!, id: String!, categoryName: String!): DataSetCategory!
    deleteDatasetCategory(accessId: String!, accessSecret: String! datasetId: String!, categoryName: String!): Boolean!
}
`;
