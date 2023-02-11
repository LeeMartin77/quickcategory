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
    key_id: String!
    category_id: String!
}

input DataSetItemInput {
    value: [String!]!
}

input DataSetAdminKeyInput {
  accessId: String!
  accessSecret: String!
}

type CreateDataSetResponse {
    id: String!
    accessId: String!
    accessSecret: String!
}

type Query {
    datasetAdminKey(access: DataSetAdminKeyInput!): DataSetAdminKey!
}

type Mutation {
  createAnonymousDataset(name: String!, itemWidth: Int!, itemTypeKeys: [String!], itemLabels: [String!]): CreateDataSetResponse!
    
  addDatasetCategory(access: DataSetAdminKeyInput!, datasetId: String!, categoryName: String!): DataSetCategory!
  updateDatasetCategory(access: DataSetAdminKeyInput!, datasetId: String!, id: String!, categoryName: String!): DataSetCategory!
  deleteDatasetCategory(access: DataSetAdminKeyInput!, datasetId: String!, categoryName: String!): Boolean!

  addCategorisationKey(access: DataSetAdminKeyInput!, datasetId: String!, label: String!): DataSetCategorisationKey!
  updateCategorisationKey(access: DataSetAdminKeyInput!, datasetId: String!, id: String!, label: String!): DataSetCategorisationKey!
  deleteCategorisationKey(access: DataSetAdminKeyInput!, datasetId: String!, id: String!): Boolean!

  addDataSetItems(access: DataSetAdminKeyInput!, datasetId: String!, items: [DataSetItemInput!]!): [DataSetItem!]!
  """Returns deletion count"""
  deleteDataSetItems(access: DataSetAdminKeyInput!, datasetId: String!, item_ids: [String!]!): Int!
}
`;
