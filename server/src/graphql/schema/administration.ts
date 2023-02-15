export default `#graphql
type DatasetAdminKey {
    dataset_id: String!
    id: String!
    data_set: Dataset!
}

type Dataset {
    id: String!
    name: String!
    value_info: [DatasetItemValueInfo!]!
    categories: [DatasetCategory!]!
    categorisations: [DatasetItemCategorisation!]!
    categorisation_keys: [DatasetCategorisationKey!]!
    """TODO: Will definitely need pagination"""
    items: [DatasetItem!]!
    item_count: Int!
}

type DatasetCategorisationKey {
    dataset_id: String!
    id: String!
    label: String!
}

type DatasetItemCategorisation {
    dataset_id: String!
    id: String!
    item_id: String!
    key_id: String!
    category_id: String!
}

input DatasetItemInput {
    value: [String!]!
}

input DatasetAdminKeyInput {
  accessId: String!
  accessSecret: String!
}

type CreateDatasetResponse {
    id: String!
    accessId: String!
    accessSecret: String!
}

type Query {
    datasetAdminKey(access: DatasetAdminKeyInput!): DatasetAdminKey!
}

type Mutation {
  createAnonymousDataset(name: String!, itemTypeKeys: [String!]!, itemLabels: [String!]!): CreateDatasetResponse!
    
  addDatasetCategory(access: DatasetAdminKeyInput!, datasetId: String!, categoryName: String!): DatasetCategory!
  updateDatasetCategory(access: DatasetAdminKeyInput!, datasetId: String!, id: String!, categoryName: String!): DatasetCategory!
  deleteDatasetCategory(access: DatasetAdminKeyInput!, datasetId: String!, categoryName: String!): Boolean!

  addCategorisationKey(access: DatasetAdminKeyInput!, datasetId: String!, label: String!): DatasetCategorisationKey!
  updateCategorisationKey(access: DatasetAdminKeyInput!, datasetId: String!, id: String!, label: String!): DatasetCategorisationKey!
  deleteCategorisationKey(access: DatasetAdminKeyInput!, datasetId: String!, id: String!): Boolean!

  addDatasetItems(access: DatasetAdminKeyInput!, datasetId: String!, items: [DatasetItemInput!]!): [DatasetItem!]!
  """Returns deletion count"""
  deleteDatasetItems(access: DatasetAdminKeyInput!, datasetId: String!, item_ids: [String!]!): Int!
}
`;
