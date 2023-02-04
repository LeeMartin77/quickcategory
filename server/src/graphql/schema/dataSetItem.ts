export default `#graphql
type DataSetItemCategorisation {
    dataset_id: String!
    id: String!
    category_id: String!
    item_id: String!
    key_id: String!
}
type DataSetItem {
    dataset_id: String!
    id: String!
    """Types for values - sourced from dataset"""
    types: [String!]!
    """labels for values - sourced from dataset"""
    labels: [String!]!
    """categories available for item"""
    categories: [DataSetCategory!]!
    """valeus of an item as raw strings"""
    value: [String!]!
}

type CategorisationResult {
    success: Boolean
}

type Query {
}

input DataSetItemInput {
    value: [String!]!
}

type Mutation {
    categoriseItem(categorisationKeyId: String!, itemId: String!, categoryId: String!): CategorisationResult!

    """Relies on pulling admin id and secret from headers"""
    addDataSetItems(dataset_id: String!, items: [DataSetItemInput!]!): [DataSetItem!]!
    """Relies on pulling admin id and secret from headers - Returns deletion count"""
    deleteDataSetItems(dataset_id: String!, item_ids: [String!]!): Int!
}
`