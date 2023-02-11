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

export type CreateDataSetResponse = {
  __typename?: 'CreateDataSetResponse';
  accessId: Scalars['String'];
  accessSecret: Scalars['String'];
  id: Scalars['String'];
};

export type DataSet = {
  __typename?: 'DataSet';
  categories: Array<DataSetCategory>;
  categorisation_keys: Array<DataSetCategorisationKey>;
  categorisations: Array<DataSetItemCategorisation>;
  id: Scalars['String'];
  item_count: Scalars['Int'];
  /** TODO: Will definitely need pagination */
  items: Array<DataSetItem>;
  name: Scalars['String'];
  value_info: Array<DataSetItemValueInfo>;
};

export type DataSetAdminKey = {
  __typename?: 'DataSetAdminKey';
  data_set: DataSet;
  dataset_id: Scalars['String'];
  id: Scalars['String'];
};

export type DataSetAdminKeyInput = {
  accessId: Scalars['String'];
  accessSecret: Scalars['String'];
};

export type DataSetCategorisationKey = {
  __typename?: 'DataSetCategorisationKey';
  dataset_id: Scalars['String'];
  id: Scalars['String'];
  label: Scalars['String'];
};

export type DataSetCategory = {
  __typename?: 'DataSetCategory';
  dataset_id: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type DataSetItem = {
  __typename?: 'DataSetItem';
  /** categories available for item */
  categories: Array<DataSetCategory>;
  dataset_id: Scalars['String'];
  id: Scalars['String'];
  /** valeus of an item as raw strings */
  value: Array<Scalars['String']>;
  /** sourced from dataset */
  value_info: Array<DataSetItemValueInfo>;
};

export type DataSetItemCategorisation = {
  __typename?: 'DataSetItemCategorisation';
  category_id: Scalars['String'];
  dataset_id: Scalars['String'];
  id: Scalars['String'];
  item_id: Scalars['String'];
  key_id: Scalars['String'];
};

export type DataSetItemInput = {
  value: Array<Scalars['String']>;
};

export type DataSetItemValueInfo = {
  __typename?: 'DataSetItemValueInfo';
  index: Scalars['Int'];
  label: Scalars['String'];
  type: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategorisationKey: DataSetCategorisationKey;
  addDataSetItems: Array<DataSetItem>;
  addDatasetCategory: DataSetCategory;
  categoriseItem: CategorisationResult;
  createAnonymousDataset: CreateDataSetResponse;
  deleteCategorisationKey: Scalars['Boolean'];
  /** Returns deletion count */
  deleteDataSetItems: Scalars['Int'];
  deleteDatasetCategory: Scalars['Boolean'];
  getItemToCategorise?: Maybe<DataSetItem>;
  updateCategorisationKey: DataSetCategorisationKey;
  updateDatasetCategory: DataSetCategory;
};


export type MutationAddCategorisationKeyArgs = {
  access: DataSetAdminKeyInput;
  datasetId: Scalars['String'];
  label: Scalars['String'];
};


export type MutationAddDataSetItemsArgs = {
  access: DataSetAdminKeyInput;
  datasetId: Scalars['String'];
  items: Array<DataSetItemInput>;
};


export type MutationAddDatasetCategoryArgs = {
  access: DataSetAdminKeyInput;
  categoryName: Scalars['String'];
  datasetId: Scalars['String'];
};


export type MutationCategoriseItemArgs = {
  categorisationKeyId: Scalars['String'];
  categoryId: Scalars['String'];
  itemId: Scalars['String'];
};


export type MutationCreateAnonymousDatasetArgs = {
  itemLabels?: InputMaybe<Array<Scalars['String']>>;
  itemTypeKeys?: InputMaybe<Array<Scalars['String']>>;
  itemWidth: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationDeleteCategorisationKeyArgs = {
  access: DataSetAdminKeyInput;
  datasetId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationDeleteDataSetItemsArgs = {
  access: DataSetAdminKeyInput;
  datasetId: Scalars['String'];
  item_ids: Array<Scalars['String']>;
};


export type MutationDeleteDatasetCategoryArgs = {
  access: DataSetAdminKeyInput;
  categoryName: Scalars['String'];
  datasetId: Scalars['String'];
};


export type MutationGetItemToCategoriseArgs = {
  categorisationKeyId: Scalars['String'];
};


export type MutationUpdateCategorisationKeyArgs = {
  access: DataSetAdminKeyInput;
  datasetId: Scalars['String'];
  id: Scalars['String'];
  label: Scalars['String'];
};


export type MutationUpdateDatasetCategoryArgs = {
  access: DataSetAdminKeyInput;
  categoryName: Scalars['String'];
  datasetId: Scalars['String'];
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  datasetAdminKey: DataSetAdminKey;
};


export type QueryDatasetAdminKeyArgs = {
  access: DataSetAdminKeyInput;
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
  CreateDataSetResponse: ResolverTypeWrapper<CreateDataSetResponse>;
  DataSet: ResolverTypeWrapper<DataSet>;
  DataSetAdminKey: ResolverTypeWrapper<DataSetAdminKey>;
  DataSetAdminKeyInput: DataSetAdminKeyInput;
  DataSetCategorisationKey: ResolverTypeWrapper<DataSetCategorisationKey>;
  DataSetCategory: ResolverTypeWrapper<DataSetCategory>;
  DataSetItem: ResolverTypeWrapper<DataSetItem>;
  DataSetItemCategorisation: ResolverTypeWrapper<DataSetItemCategorisation>;
  DataSetItemInput: DataSetItemInput;
  DataSetItemValueInfo: ResolverTypeWrapper<DataSetItemValueInfo>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CategorisationResult: CategorisationResult;
  CreateDataSetResponse: CreateDataSetResponse;
  DataSet: DataSet;
  DataSetAdminKey: DataSetAdminKey;
  DataSetAdminKeyInput: DataSetAdminKeyInput;
  DataSetCategorisationKey: DataSetCategorisationKey;
  DataSetCategory: DataSetCategory;
  DataSetItem: DataSetItem;
  DataSetItemCategorisation: DataSetItemCategorisation;
  DataSetItemInput: DataSetItemInput;
  DataSetItemValueInfo: DataSetItemValueInfo;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
};

export type CategorisationResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategorisationResult'] = ResolversParentTypes['CategorisationResult']> = {
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateDataSetResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateDataSetResponse'] = ResolversParentTypes['CreateDataSetResponse']> = {
  accessId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accessSecret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DataSetResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSet'] = ResolversParentTypes['DataSet']> = {
  categories?: Resolver<Array<ResolversTypes['DataSetCategory']>, ParentType, ContextType>;
  categorisation_keys?: Resolver<Array<ResolversTypes['DataSetCategorisationKey']>, ParentType, ContextType>;
  categorisations?: Resolver<Array<ResolversTypes['DataSetItemCategorisation']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  item_count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['DataSetItem']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value_info?: Resolver<Array<ResolversTypes['DataSetItemValueInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DataSetAdminKeyResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSetAdminKey'] = ResolversParentTypes['DataSetAdminKey']> = {
  data_set?: Resolver<ResolversTypes['DataSet'], ParentType, ContextType>;
  dataset_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DataSetCategorisationKeyResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSetCategorisationKey'] = ResolversParentTypes['DataSetCategorisationKey']> = {
  dataset_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DataSetCategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSetCategory'] = ResolversParentTypes['DataSetCategory']> = {
  dataset_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DataSetItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSetItem'] = ResolversParentTypes['DataSetItem']> = {
  categories?: Resolver<Array<ResolversTypes['DataSetCategory']>, ParentType, ContextType>;
  dataset_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  value_info?: Resolver<Array<ResolversTypes['DataSetItemValueInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DataSetItemCategorisationResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSetItemCategorisation'] = ResolversParentTypes['DataSetItemCategorisation']> = {
  category_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dataset_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  item_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  key_id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DataSetItemValueInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['DataSetItemValueInfo'] = ResolversParentTypes['DataSetItemValueInfo']> = {
  index?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addCategorisationKey?: Resolver<ResolversTypes['DataSetCategorisationKey'], ParentType, ContextType, RequireFields<MutationAddCategorisationKeyArgs, 'access' | 'datasetId' | 'label'>>;
  addDataSetItems?: Resolver<Array<ResolversTypes['DataSetItem']>, ParentType, ContextType, RequireFields<MutationAddDataSetItemsArgs, 'access' | 'datasetId' | 'items'>>;
  addDatasetCategory?: Resolver<ResolversTypes['DataSetCategory'], ParentType, ContextType, RequireFields<MutationAddDatasetCategoryArgs, 'access' | 'categoryName' | 'datasetId'>>;
  categoriseItem?: Resolver<ResolversTypes['CategorisationResult'], ParentType, ContextType, RequireFields<MutationCategoriseItemArgs, 'categorisationKeyId' | 'categoryId' | 'itemId'>>;
  createAnonymousDataset?: Resolver<ResolversTypes['CreateDataSetResponse'], ParentType, ContextType, RequireFields<MutationCreateAnonymousDatasetArgs, 'itemWidth' | 'name'>>;
  deleteCategorisationKey?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteCategorisationKeyArgs, 'access' | 'datasetId' | 'id'>>;
  deleteDataSetItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationDeleteDataSetItemsArgs, 'access' | 'datasetId' | 'item_ids'>>;
  deleteDatasetCategory?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteDatasetCategoryArgs, 'access' | 'categoryName' | 'datasetId'>>;
  getItemToCategorise?: Resolver<Maybe<ResolversTypes['DataSetItem']>, ParentType, ContextType, RequireFields<MutationGetItemToCategoriseArgs, 'categorisationKeyId'>>;
  updateCategorisationKey?: Resolver<ResolversTypes['DataSetCategorisationKey'], ParentType, ContextType, RequireFields<MutationUpdateCategorisationKeyArgs, 'access' | 'datasetId' | 'id' | 'label'>>;
  updateDatasetCategory?: Resolver<ResolversTypes['DataSetCategory'], ParentType, ContextType, RequireFields<MutationUpdateDatasetCategoryArgs, 'access' | 'categoryName' | 'datasetId' | 'id'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  datasetAdminKey?: Resolver<ResolversTypes['DataSetAdminKey'], ParentType, ContextType, RequireFields<QueryDatasetAdminKeyArgs, 'access'>>;
};

export type Resolvers<ContextType = any> = {
  CategorisationResult?: CategorisationResultResolvers<ContextType>;
  CreateDataSetResponse?: CreateDataSetResponseResolvers<ContextType>;
  DataSet?: DataSetResolvers<ContextType>;
  DataSetAdminKey?: DataSetAdminKeyResolvers<ContextType>;
  DataSetCategorisationKey?: DataSetCategorisationKeyResolvers<ContextType>;
  DataSetCategory?: DataSetCategoryResolvers<ContextType>;
  DataSetItem?: DataSetItemResolvers<ContextType>;
  DataSetItemCategorisation?: DataSetItemCategorisationResolvers<ContextType>;
  DataSetItemValueInfo?: DataSetItemValueInfoResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

