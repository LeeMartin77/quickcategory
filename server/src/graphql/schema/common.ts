export default `#graphql
type DatasetItem {
    dataset_id: String!
    id: String!
    """sourced from dataset"""
    value_info: [DatasetItemValueInfo!]!
    """categories available for item"""
    categories: [DatasetCategory!]!
    """valeus of an item as raw strings"""
    value: [String!]!
}

type DatasetItemValueInfo {
    index: Int!
    type: String!
    label: String!
}

type DatasetCategory {
    dataset_id: String!
    key: String!
    name: String!
}

type CategorisationResult {
    success: Boolean
}

type Mutation {
    categoriseItem(categorisationKeyId: String!, itemId: String!, categoryId: String!): CategorisationResult!

    getItemToCategorise(categorisationKeyId: String!): DatasetItem
}
`;
