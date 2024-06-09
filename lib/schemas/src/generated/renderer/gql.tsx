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

export type Author = Node & {
  __typename?: 'Author';
  age?: Maybe<Scalars['Int']['output']>;
  books: Array<Maybe<Book>>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Book = Node & {
  __typename?: 'Book';
  author: Author;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

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

export type Node = {
  id: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  books: Array<Book>;
  file?: Maybe<File>;
  hello: Scalars['String']['output'];
  rollThreeDice: Array<Scalars['Int']['output']>;
};


export type QueryFileArgs = {
  path: Scalars['String']['input'];
};

export type GetBooksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBooksQuery = { __typename?: 'Query', books: Array<{ __typename?: 'Book', title: string }> };

export type GetFileQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type GetFileQuery = { __typename?: 'Query', file?: { __typename?: 'File', name: string, path: string, ls: Array<{ __typename?: 'File', name: string, type: FileType, updatedAt: number, size: number }> } | null };
