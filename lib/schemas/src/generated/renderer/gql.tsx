import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Content = Node & {
  __typename?: 'Content';
  contentType: ContentType;
  icon: Icon;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
  project?: Maybe<Project>;
  size: Scalars['Float']['output'];
  updatedAt: Scalars['Float']['output'];
};

export enum ContentType {
  Directory = 'Directory',
  File = 'File',
  Link = 'Link',
  Software = 'Software'
}

export type File = {
  __typename?: 'File';
  ls: Array<File>;
  name: Scalars['String']['output'];
  path: Scalars['String']['output'];
  size: Scalars['Int']['output'];
  type: FileType;
  updatedAt: Scalars['Float']['output'];
};

export enum FileType {
  Directory = 'DIRECTORY',
  File = 'FILE'
}

export type Icon = Node & {
  __typename?: 'Icon';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  srcPath: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteContent?: Maybe<Content>;
  deleteIcon?: Maybe<Icon>;
  deleteProject?: Maybe<Project>;
  deleteTag?: Maybe<Tag>;
  insertContent?: Maybe<Content>;
  insertIcon?: Maybe<Icon>;
  insertProject?: Maybe<Project>;
  insertTag?: Maybe<Tag>;
  registTag?: Maybe<Scalars['Boolean']['output']>;
  updateContent?: Maybe<Content>;
  updateIcon?: Maybe<Icon>;
  updateProject?: Maybe<Project>;
  updateTag?: Maybe<Tag>;
};


export type MutationDeleteContentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteIconArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTagArgs = {
  id: Scalars['ID']['input'];
};


export type MutationInsertContentArgs = {
  icon?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  path: Scalars['String']['input'];
  projectId: Scalars['ID']['input'];
};


export type MutationInsertIconArgs = {
  binary: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationInsertProjectArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  iconId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};


export type MutationInsertTagArgs = {
  color?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationRegistTagArgs = {
  projectId: Scalars['ID']['input'];
  tagId: Scalars['ID']['input'];
};


export type MutationUpdateContentArgs = {
  icon?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['ID']['input'];
};


export type MutationUpdateIconArgs = {
  binary?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateProjectArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  iconId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateTagArgs = {
  color?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Node = {
  id: Scalars['ID']['output'];
};

export type Project = Node & {
  __typename?: 'Project';
  contents: Array<Maybe<Content>>;
  description?: Maybe<Scalars['String']['output']>;
  icon: Icon;
  id: Scalars['ID']['output'];
  sort?: Maybe<Scalars['Int']['output']>;
  tags: Array<Maybe<Tag>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  file?: Maybe<File>;
  getProject?: Maybe<Project>;
  icons: Array<Maybe<Icon>>;
  projects: Array<Maybe<Project>>;
};


export type QueryFileArgs = {
  path: Scalars['String']['input'];
};


export type QueryGetProjectArgs = {
  id: Scalars['ID']['input'];
};

export type Software = Node & {
  __typename?: 'Software';
  args: Array<Maybe<Scalars['String']['output']>>;
  icon: Icon;
  id: Scalars['ID']['output'];
  path: Scalars['String']['output'];
};

export type Tag = Node & {
  __typename?: 'Tag';
  color: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  projects: Array<Maybe<Project>>;
};

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject?: { __typename?: 'Project', title: string } | null };

export type GetFileQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type GetFileQuery = { __typename?: 'Query', file?: { __typename?: 'File', name: string, type: FileType, path: string, updatedAt: number, size: number, ls: Array<{ __typename?: 'File', name: string, type: FileType, path: string, updatedAt: number, size: number }> } | null };

export type GetIconQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIconQuery = { __typename?: 'Query', icons: Array<{ __typename?: 'Icon', id: string, srcPath: string, name: string } | null> };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProjectQuery = { __typename?: 'Query', getProject?: { __typename?: 'Project', id: string, title: string, icon: { __typename?: 'Icon', id: string, srcPath: string, name: string }, contents: Array<{ __typename?: 'Content', contentType: ContentType, id: string, name: string, updatedAt: number, size: number, icon: { __typename?: 'Icon', id: string, srcPath: string, name: string } } | null>, tags: Array<{ __typename?: 'Tag', id: string, name: string, color: string } | null> } | null };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, title: string, sort?: number | null, description?: string | null, icon: { __typename?: 'Icon', id: string, name: string, srcPath: string }, tags: Array<{ __typename?: 'Tag', id: string, name: string, color: string } | null> } | null> };

export type InsertIconMutationVariables = Exact<{
  name: Scalars['String']['input'];
  binary: Scalars['String']['input'];
}>;


export type InsertIconMutation = { __typename?: 'Mutation', insertIcon?: { __typename?: 'Icon', id: string, srcPath: string, name: string } | null };

export type InsertProjectMutationVariables = Exact<{
  name: Scalars['String']['input'];
  iconId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type InsertProjectMutation = { __typename?: 'Mutation', insertProject?: { __typename?: 'Project', id: string, title: string, description?: string | null } | null };

export type UpdateProjectMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']['input']>;
  iconId?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'Project', id: string, title: string, description?: string | null, sort?: number | null } | null };


export const DeleteProjectDocument = gql`
    mutation DeleteProject($id: ID!) {
  deleteProject(id: $id) {
    title
  }
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const GetFileDocument = gql`
    query GetFile($path: String!) {
  file(path: $path) {
    name
    type
    path
    updatedAt
    size
    ls {
      name
      type
      path
      updatedAt
      size
    }
  }
}
    `;

/**
 * __useGetFileQuery__
 *
 * To run a query within a React component, call `useGetFileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFileQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useGetFileQuery(baseOptions: Apollo.QueryHookOptions<GetFileQuery, GetFileQueryVariables> & ({ variables: GetFileQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFileQuery, GetFileQueryVariables>(GetFileDocument, options);
      }
export function useGetFileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFileQuery, GetFileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFileQuery, GetFileQueryVariables>(GetFileDocument, options);
        }
export function useGetFileSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFileQuery, GetFileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFileQuery, GetFileQueryVariables>(GetFileDocument, options);
        }
export type GetFileQueryHookResult = ReturnType<typeof useGetFileQuery>;
export type GetFileLazyQueryHookResult = ReturnType<typeof useGetFileLazyQuery>;
export type GetFileSuspenseQueryHookResult = ReturnType<typeof useGetFileSuspenseQuery>;
export type GetFileQueryResult = Apollo.QueryResult<GetFileQuery, GetFileQueryVariables>;
export const GetIconDocument = gql`
    query GetIcon {
  icons {
    id
    srcPath
    name
  }
}
    `;

/**
 * __useGetIconQuery__
 *
 * To run a query within a React component, call `useGetIconQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetIconQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetIconQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetIconQuery(baseOptions?: Apollo.QueryHookOptions<GetIconQuery, GetIconQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetIconQuery, GetIconQueryVariables>(GetIconDocument, options);
      }
export function useGetIconLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetIconQuery, GetIconQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetIconQuery, GetIconQueryVariables>(GetIconDocument, options);
        }
export function useGetIconSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetIconQuery, GetIconQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetIconQuery, GetIconQueryVariables>(GetIconDocument, options);
        }
export type GetIconQueryHookResult = ReturnType<typeof useGetIconQuery>;
export type GetIconLazyQueryHookResult = ReturnType<typeof useGetIconLazyQuery>;
export type GetIconSuspenseQueryHookResult = ReturnType<typeof useGetIconSuspenseQuery>;
export type GetIconQueryResult = Apollo.QueryResult<GetIconQuery, GetIconQueryVariables>;
export const GetProjectDocument = gql`
    query GetProject($id: ID!) {
  getProject(id: $id) {
    id
    title
    icon {
      id
      srcPath
      name
    }
    contents {
      contentType
      id
      name
      updatedAt
      size
      icon {
        id
        srcPath
        name
      }
    }
    tags {
      id
      name
      color
    }
  }
}
    `;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables> & ({ variables: GetProjectQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
        }
export function useGetProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectSuspenseQueryHookResult = ReturnType<typeof useGetProjectSuspenseQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const GetProjectsDocument = gql`
    query GetProjects {
  projects {
    id
    title
    sort
    description
    icon {
      id
      name
      srcPath
    }
    tags {
      id
      name
      color
    }
  }
}
    `;

/**
 * __useGetProjectsQuery__
 *
 * To run a query within a React component, call `useGetProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
      }
export function useGetProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export function useGetProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProjectsQuery, GetProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectsQuery, GetProjectsQueryVariables>(GetProjectsDocument, options);
        }
export type GetProjectsQueryHookResult = ReturnType<typeof useGetProjectsQuery>;
export type GetProjectsLazyQueryHookResult = ReturnType<typeof useGetProjectsLazyQuery>;
export type GetProjectsSuspenseQueryHookResult = ReturnType<typeof useGetProjectsSuspenseQuery>;
export type GetProjectsQueryResult = Apollo.QueryResult<GetProjectsQuery, GetProjectsQueryVariables>;
export const InsertIconDocument = gql`
    mutation InsertIcon($name: String!, $binary: String!) {
  insertIcon(name: $name, binary: $binary) {
    id
    srcPath
    name
  }
}
    `;
export type InsertIconMutationFn = Apollo.MutationFunction<InsertIconMutation, InsertIconMutationVariables>;

/**
 * __useInsertIconMutation__
 *
 * To run a mutation, you first call `useInsertIconMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertIconMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertIconMutation, { data, loading, error }] = useInsertIconMutation({
 *   variables: {
 *      name: // value for 'name'
 *      binary: // value for 'binary'
 *   },
 * });
 */
export function useInsertIconMutation(baseOptions?: Apollo.MutationHookOptions<InsertIconMutation, InsertIconMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertIconMutation, InsertIconMutationVariables>(InsertIconDocument, options);
      }
export type InsertIconMutationHookResult = ReturnType<typeof useInsertIconMutation>;
export type InsertIconMutationResult = Apollo.MutationResult<InsertIconMutation>;
export type InsertIconMutationOptions = Apollo.BaseMutationOptions<InsertIconMutation, InsertIconMutationVariables>;
export const InsertProjectDocument = gql`
    mutation InsertProject($name: String!, $iconId: ID!, $description: String, $sort: String) {
  insertProject(name: $name, iconId: $iconId, description: $description) {
    id
    title
    description
  }
}
    `;
export type InsertProjectMutationFn = Apollo.MutationFunction<InsertProjectMutation, InsertProjectMutationVariables>;

/**
 * __useInsertProjectMutation__
 *
 * To run a mutation, you first call `useInsertProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertProjectMutation, { data, loading, error }] = useInsertProjectMutation({
 *   variables: {
 *      name: // value for 'name'
 *      iconId: // value for 'iconId'
 *      description: // value for 'description'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useInsertProjectMutation(baseOptions?: Apollo.MutationHookOptions<InsertProjectMutation, InsertProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertProjectMutation, InsertProjectMutationVariables>(InsertProjectDocument, options);
      }
export type InsertProjectMutationHookResult = ReturnType<typeof useInsertProjectMutation>;
export type InsertProjectMutationResult = Apollo.MutationResult<InsertProjectMutation>;
export type InsertProjectMutationOptions = Apollo.BaseMutationOptions<InsertProjectMutation, InsertProjectMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($name: String, $iconId: ID, $description: String, $sort: String, $id: ID!) {
  updateProject(
    name: $name
    iconId: $iconId
    description: $description
    sort: $sort
    id: $id
  ) {
    id
    title
    description
    sort
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      name: // value for 'name'
 *      iconId: // value for 'iconId'
 *      description: // value for 'description'
 *      sort: // value for 'sort'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;