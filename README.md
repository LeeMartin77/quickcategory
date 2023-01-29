# quickcategory

Application for quickly categorising data

## The Data Model

This whole thing is built around neo4j - so need to have some deep thinking on the model.

This initial version is built around the idea of "anon" users

```mermaid
erDiagram
  DataSetAdminKey {
    string id
    string hashed_admin_key
    string hashed_admin_key_salt
  }
  DataSet ||..|| DataSetAdminKey : has
  DataSetCategorisationKey {
    string parent_id
    string id
    string label
  }
  DataSet {
    string id
    string name
    string source_file
    string sector
  }
  DataSet ||--|{ DataSetItem : contains
  DataSetCategory {
    string parent_id
    string id
    string name
    string source_file
    string sector
  }
  DataSet ||--|{ DataSetCategory : contains
  DataSetCategory }|--|| DataSetItem : categorised-by
  DataSet ||..|{ DataSetCategorisationKey : has
  DataSetCategory }|..|{ DataSetCategorisationKey : uses
  DataSetItem {
    string parent_id
    string id
  }
  DataSetCategorisationKey ||..|{ DataSetItem : categorises
  DataSetItem ||--|{ DataSetItemValue : contains
  DataSetItemValue {
    string parent_id
    string id
    string type
    string label
    string value
  }
```
