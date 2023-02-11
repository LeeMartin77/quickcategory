export default `#graphql
type DataSetItem {
    dataset_id: String!
    id: String!
    """sourced from dataset"""
    value_info: [DataSetItemValueInfo!]!
    """categories available for item"""
    categories: [DataSetCategory!]!
    """valeus of an item as raw strings"""
    value: [String!]!
}

type CategorisationResult {
    success: Boolean
}

input DataSetItemInput {
    value: [String!]!
}

type Mutation {
    categoriseItem(categorisationKeyId: String!, itemId: String!, categoryId: String!): CategorisationResult!

    getItemToCategorise(categorisationKeyId: String!): DataSetItem

    addDataSetItems(accessId: String!, accessSecret: String! datasetId: String!, items: [DataSetItemInput!]!): [DataSetItem!]!
    """Returns deletion count"""
    deleteDataSetItems(accessId: String!, accessSecret: String! datasetId: String!, item_ids: [String!]!): Int!
}
`;
