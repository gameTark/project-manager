export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  name: Scalars['String']['input'];
  srcPath: Scalars['String']['input'];
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
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  srcPath?: InputMaybe<Scalars['String']['input']>;
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
