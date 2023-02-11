export default `#graphql
type DataSetAdminKey {
    dataset_id: String!
    id: String!
    data_set: DataSet!
}

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

type DataSetCategorisationKey {
    dataset_id: String!
    id: String!
    label: String!
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

input DataSetItemInput {
    value: [String!]!
}

type CreateDataSetResponse {
    id: String!
    accessId: String!
    accessSecret: String!
}

type Query {
    datasetAdminKey(accessId: String!, accessSecret: String!): DataSetAdminKey!
}

type Mutation {
  createAnonymousDataset(name: String!, itemWidth: Int!, itemTypeKeys: [String!], itemLabels: [String!]): CreateDataSetResponse!
    
  addDatasetCategory(accessId: String!, accessSecret: String! datasetId: String!, categoryName: String!): DataSetCategory!
  updateDatasetCategory(accessId: String!, accessSecret: String! datasetId: String!, id: String!, categoryName: String!): DataSetCategory!
  deleteDatasetCategory(accessId: String!, accessSecret: String! datasetId: String!, categoryName: String!): Boolean!

  addCategorisationKey(accessId: String!, accessSecret: String! datasetId: String!, label: String!): DataSetCategorisationKey!
  updateCategorisationKey(accessId: String!, accessSecret: String! datasetId: String!, id: String!, label: String!): DataSetCategorisationKey!
  deleteCategorisationKey(accessId: String!, accessSecret: String! datasetId: String!, id: String!): Boolean!

  addDataSetItems(accessId: String!, accessSecret: String! datasetId: String!, items: [DataSetItemInput!]!): [DataSetItem!]!
  """Returns deletion count"""
  deleteDataSetItems(accessId: String!, accessSecret: String! datasetId: String!, item_ids: [String!]!): Int!
}
`;
