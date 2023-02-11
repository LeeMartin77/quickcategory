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

type CategorisationResult {
    success: Boolean
}

type Mutation {
    categoriseItem(categorisationKeyId: String!, itemId: String!, categoryId: String!): CategorisationResult!

    getItemToCategorise(categorisationKeyId: String!): DataSetItem
}
`;
