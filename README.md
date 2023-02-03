# quickcategory

Application for quickly categorising data

## The Data Model

This initial version is built around the idea of "anon" users

```mermaid
erDiagram
  DatasetItemTypes {
    string label "May be defined in code"
    string key "May be defined in code"
  }
  DataSetAdminKey {
    string id
    string hashed_admin_key
    string hashed_admin_key_salt
  }
  DataSetCategorisationKey {
    string dataset_id
    string id
    string label
  }
  DataSet {
    string id
    string name
    string source_file
    array item_type_keys "ordered strings"
    array item_labels "ordered strings"
  }
  DataSetCategory {
    string dataset_id
    string id
    string name
  }
  DataSetItemCategorisation {
    string id
    string category_id
    string item_id
    string key_id
  }
  DataSetItem {
    string dataset_id
    string id
    value array "ordered strings"
  }
  DataSet ||--|{ DataSetCategory : contains
  DataSet ||--|{ DataSetCategorisationKey : has
  DataSet ||--|| DataSetAdminKey : has
  DataSet ||--|{ DataSetItem : containsformats
  DataSetItem ||--|{ DataSetItemCategorisation : categorised-by
  DataSetCategory ||--|{ DataSetItemCategorisation : using
  DataSetCategorisationKey ||--|{ DataSetItemCategorisation : categorised
  DatasetItemTypes ||..|{ DataSet : informs
  DataSetCategory }|..|{ DataSetCategorisationKey : uses
  DataSetCategorisationKey ||..|{ DataSetItem : categorises
```
