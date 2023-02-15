import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CategorisationResult = {
  __typename?: 'CategorisationResult';
  success?: Maybe<Scalars['Boolean']>;
};

export type CreateDatasetResponse = {
  __typename?: 'CreateDatasetResponse';
  accessId: Scalars['String'];
  accessSecret: Scalars['String'];
  id: Scalars['String'];
};

export type Dataset = {
  __typename?: 'Dataset';
  categories: Array<DatasetCategory>;
  categorisation_keys: Array<DatasetCategorisationKey>;
  categorisations: Array<DatasetItemCategorisation>;
  id: Scalars['String'];
  item_count: Scalars['Int'];
  /** TODO: Will definitely need pagination */
  items: Array<DatasetItem>;
  name: Scalars['String'];
  value_info: Array<DatasetItemValueInfo>;
};

export type DatasetAdminKey = {
  __typename?: 'DatasetAdminKey';
  data_set: Dataset;
  dataset_id: Scalars['String'];
  id: Scalars['String'];
};

export type DatasetAdminKeyInput = {
  accessId: Scalars['String'];
  accessSecret: Scalars['String'];
};

export type DatasetCategorisationKey = {
  __typename?: 'DatasetCategorisationKey';
  dataset_id: Scalars['String'];
  id: Scalars['String'];
  label: Scalars['String'];
};

export type DatasetCategory = {
  __typename?: 'DatasetCategory';
  dataset_id: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type DatasetItem = {
  __typename?: 'DatasetItem';
  /** categories available for item */
  categories: Array<DatasetCategory>;
  dataset_id: Scalars['String'];
  id: Scalars['String'];
  /** valeus of an item as raw strings */
  value: Array<Scalars['String']>;
  /** sourced from dataset */
  value_info: Array<DatasetItemValueInfo>;
};

export type DatasetItemCategorisation = {
  __typename?: 'DatasetItemCategorisation';
  category_id: Scalars['String'];
  dataset_id: Scalars['String'];
  id: Scalars['String'];
  item_id: Scalars['String'];
  key_id: Scalars['String'];
};

export type DatasetItemInput = {
  value: Array<Scalars['String']>;
};

export type DatasetItemValueInfo = {
  __typename?: 'DatasetItemValueInfo';
  index: Scalars['Int'];
  label: Scalars['String'];
  type: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategorisationKey: DatasetCategorisationKey;
  addDatasetCategory: DatasetCategory;
  addDatasetItems: Array<DatasetItem>;
  categoriseItem: CategorisationResult;
  createAnonymousDataset: CreateDatasetResponse;
  deleteCategorisationKey: Scalars['Boolean'];
  deleteDatasetCategory: Scalars['Boolean'];
  /** Returns deletion count */
  deleteDatasetItems: Scalars['Int'];
  getItemToCategorise?: Maybe<DatasetItem>;
  updateCategorisationKey: DatasetCategorisationKey;
  updateDatasetCategory: DatasetCategory;
};


export type MutationAddCategorisationKeyArgs = {
  access: DatasetAdminKeyInput;
  datasetId: Scalars['String'];
  label: Scalars['String'];
};


export type MutationAddDatasetCategoryArgs = {
  access: DatasetAdminKeyInput;
  categoryName: Scalars['String'];
  datasetId: Scalars['String'];
};


export type MutationAddDatasetItemsArgs = {
  access: DatasetAdminKeyInput;
  datasetId: Scalars['String'];
  items: Array<DatasetItemInput>;
};


export type MutationCategoriseItemArgs = {
  categorisationKeyId: Scalars['String'];
  categoryId: Scalars['String'];
  itemId: Scalars['String'];
};


export type MutationCreateAnonymousDatasetArgs = {
  itemLabels: Array<Scalars['String']>;
  itemTypeKeys: Array<Scalars['String']>;
  itemWidth: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationDeleteCategorisationKeyArgs = {
  access: DatasetAdminKeyInput;
  datasetId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationDeleteDatasetCategoryArgs = {
  access: DatasetAdminKeyInput;
  categoryName: Scalars['String'];
  datasetId: Scalars['String'];
};


export type MutationDeleteDatasetItemsArgs = {
  access: DatasetAdminKeyInput;
  datasetId: Scalars['String'];
  item_ids: Array<Scalars['String']>;
};


export type MutationGetItemToCategoriseArgs = {
  categorisationKeyId: Scalars['String'];
};


export type MutationUpdateCategorisationKeyArgs = {
  access: DatasetAdminKeyInput;
  datasetId: Scalars['String'];
  id: Scalars['String'];
  label: Scalars['String'];
};


export type MutationUpdateDatasetCategoryArgs = {
  access: DatasetAdminKeyInput;
  categoryName: Scalars['String'];
  datasetId: Scalars['String'];
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  datasetAdminKey: DatasetAdminKey;
};


export type QueryDatasetAdminKeyArgs = {
  access: DatasetAdminKeyInput;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CategorisationResult: ResolverTypeWrapper<CategorisationResult>;
  CreateDatasetResponse: ResolverTypeWrapper<CreateDatasetResponse>;
  Dataset: ResolverTypeWrapper<Dataset>;
  DatasetAdminKey: ResolverTypeWrapper<DatasetAdminKey>;
  DatasetAdminKeyInput: DatasetAdminKeyInput;
  DatasetCategorisationKey: ResolverTypeWrapper<DatasetCategorisationKey>;
  DatasetCategory: ResolverTypeWrapper<DatasetCategory>;
  DatasetItem: ResolverTypeWrapper<DatasetItem>;
  DatasetItemCategorisation: ResolverTypeWrapper<DatasetItemCategorisation>;
  DatasetItemInput: DatasetItemInput;
  DatasetItemValueInfo: ResolverTypeWrapper<DatasetItemValueInfo>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CategorisationResult: CategorisationResult;
  CreateDatasetResponse: CreateDatasetResponse;
  Dataset: Dataset;
  DatasetAdminKey: DatasetAdminKey;
  DatasetAdminKeyInput: DatasetAdminKeyInput;
  DatasetCategorisationKey: DatasetCategorisationKey;
  DatasetCategory: DatasetCategory;
  DatasetItem: DatasetItem;
  DatasetItemCategorisation: DatasetItemCategorisation;
  DatasetItemInput: DatasetItemInput;
  DatasetItemValueInfo: DatasetItemValueInfo;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
};

export type CategorisationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategorisationResult'] = ResolversParentTypes['CategorisationResult']> = {
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateDatasetResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateDatasetResponse'] = ResolversParentTypes['CreateDatasetResponse']> = {
  accessId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accessSecret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DatasetResolvers<ContextType = any, ParentType extends ResolversParentTypes['Dataset'] = ResolversParentTypes['Dataset']> = {
  categories?: Resolver<Array<ResolversTypes['DatasetCategory']>, ParentType, ContextType>;
  categorisation_keys?: Resolver<Array<ResolversTypes['DatasetCategorisationKey']>, ParentType, ContextType>;
  categorisations?: Resolver<Array<ResolversTypes['DatasetItemCategorisation']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  item_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['DatasetItem']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value_info?: Resolver<Array<ResolversTypes['DatasetItemValueInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DatasetAdminKeyResolvers<ContextType = any, ParentType extends ResolversParentTypes['DatasetAdminKey'] = ResolversParentTypes['DatasetAdminKey']> = {
  data_set?: Resolver<ResolversTypes['Dataset'], ParentType, ContextType>;
  dataset_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DatasetCategorisationKeyResolvers<ContextType = any, ParentType extends ResolversParentTypes['DatasetCategorisationKey'] = ResolversParentTypes['DatasetCategorisationKey']> = {
  dataset_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DatasetCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['DatasetCategory'] = ResolversParentTypes['DatasetCategory']> = {
  dataset_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DatasetItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['DatasetItem'] = ResolversParentTypes['DatasetItem']> = {
  categories?: Resolver<Array<ResolversTypes['DatasetCategory']>, ParentType, ContextType>;
  dataset_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  value_info?: Resolver<Array<ResolversTypes['DatasetItemValueInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DatasetItemCategorisationResolvers<ContextType = any, ParentType extends ResolversParentTypes['DatasetItemCategorisation'] = ResolversParentTypes['DatasetItemCategorisation']> = {
  category_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dataset_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  item_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DatasetItemValueInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['DatasetItemValueInfo'] = ResolversParentTypes['DatasetItemValueInfo']> = {
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addCategorisationKey?: Resolver<ResolversTypes['DatasetCategorisationKey'], ParentType, ContextType, RequireFields<MutationAddCategorisationKeyArgs, 'access' | 'datasetId' | 'label'>>;
  addDatasetCategory?: Resolver<ResolversTypes['DatasetCategory'], ParentType, ContextType, RequireFields<MutationAddDatasetCategoryArgs, 'access' | 'categoryName' | 'datasetId'>>;
  addDatasetItems?: Resolver<Array<ResolversTypes['DatasetItem']>, ParentType, ContextType, RequireFields<MutationAddDatasetItemsArgs, 'access' | 'datasetId' | 'items'>>;
  categoriseItem?: Resolver<ResolversTypes['CategorisationResult'], ParentType, ContextType, RequireFields<MutationCategoriseItemArgs, 'categorisationKeyId' | 'categoryId' | 'itemId'>>;
  createAnonymousDataset?: Resolver<ResolversTypes['CreateDatasetResponse'], ParentType, ContextType, RequireFields<MutationCreateAnonymousDatasetArgs, 'itemLabels' | 'itemTypeKeys' | 'itemWidth' | 'name'>>;
  deleteCategorisationKey?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCategorisationKeyArgs, 'access' | 'datasetId' | 'id'>>;
  deleteDatasetCategory?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteDatasetCategoryArgs, 'access' | 'categoryName' | 'datasetId'>>;
  deleteDatasetItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDeleteDatasetItemsArgs, 'access' | 'datasetId' | 'item_ids'>>;
  getItemToCategorise?: Resolver<Maybe<ResolversTypes['DatasetItem']>, ParentType, ContextType, RequireFields<MutationGetItemToCategoriseArgs, 'categorisationKeyId'>>;
  updateCategorisationKey?: Resolver<ResolversTypes['DatasetCategorisationKey'], ParentType, ContextType, RequireFields<MutationUpdateCategorisationKeyArgs, 'access' | 'datasetId' | 'id' | 'label'>>;
  updateDatasetCategory?: Resolver<ResolversTypes['DatasetCategory'], ParentType, ContextType, RequireFields<MutationUpdateDatasetCategoryArgs, 'access' | 'categoryName' | 'datasetId' | 'id'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  datasetAdminKey?: Resolver<ResolversTypes['DatasetAdminKey'], ParentType, ContextType, RequireFields<QueryDatasetAdminKeyArgs, 'access'>>;
};

export type Resolvers<ContextType = any> = {
  CategorisationResult?: CategorisationResultResolvers<ContextType>;
  CreateDatasetResponse?: CreateDatasetResponseResolvers<ContextType>;
  Dataset?: DatasetResolvers<ContextType>;
  DatasetAdminKey?: DatasetAdminKeyResolvers<ContextType>;
  DatasetCategorisationKey?: DatasetCategorisationKeyResolvers<ContextType>;
  DatasetCategory?: DatasetCategoryResolvers<ContextType>;
  DatasetItem?: DatasetItemResolvers<ContextType>;
  DatasetItemCategorisation?: DatasetItemCategorisationResolvers<ContextType>;
  DatasetItemValueInfo?: DatasetItemValueInfoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

