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
    string dataset_id
    string id
    string hashed_admin_secret
    string admin_secret_salt
  }
  DataSetCategorisationKey {
    string dataset_id
    string id
    string label
  }
  DataSet {
    string id
    string name
    array item_type_keys "ordered strings"
    array item_labels "ordered strings"
  }
  DataSetCategory {
    string dataset_id
    string id
    string name
  }
  DataSetItemCategorisation {
    string dataset_id
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
  DataSet ||..|{ DataSetItemCategorisation : owns
  DataSetItem ||--|{ DataSetItemCategorisation : categorised-by
  DataSetCategory ||--|{ DataSetItemCategorisation : using
  DataSetCategorisationKey ||--|{ DataSetItemCategorisation : categorised
  DatasetItemTypes ||..|{ DataSet : informs
  DataSetCategory }|..|{ DataSetCategorisationKey : uses
  DataSetCategorisationKey ||..|{ DataSetItem : categorises
```
