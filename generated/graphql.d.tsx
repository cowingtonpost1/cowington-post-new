import gql from 'graphql-tag';
import * as React from 'react';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Article = {
  __typename?: 'Article';
  _id: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
  date_created: Scalars['String'];
  date_posted?: Maybe<Scalars['String']>;
  posted?: Maybe<Scalars['Boolean']>;
  topic: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  _id: Scalars['ID'];
  date_created: Scalars['String'];
  date_posted: Scalars['String'];
  posted?: Maybe<Scalars['Boolean']>;
  url?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createArticle: Scalars['String'];
};


export type MutationCreateArticleArgs = {
  title: Scalars['String'];
  content: Scalars['String'];
  topic: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  articles: Array<Article>;
  article?: Maybe<Article>;
  images: Array<Image>;
};


export type QueryArticlesArgs = {
  topic: Scalars['String'];
};


export type QueryArticleArgs = {
  id: Scalars['ID'];
};

export type CreateArticleMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  topic: Scalars['String'];
}>;


export type CreateArticleMutation = { __typename?: 'Mutation', createArticle: string };

export type ArticleQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ArticleQuery = { __typename?: 'Query', article?: Maybe<{ __typename?: 'Article', _id: string, title: string, topic: string, content: string, posted?: Maybe<boolean>, date_posted?: Maybe<string>, date_created: string }> };

export type ArticlesQueryVariables = Exact<{
  topic: Scalars['String'];
}>;


export type ArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', _id: string, title: string, topic: string, content: string, date_created: string, date_posted?: Maybe<string>, posted?: Maybe<boolean> }> };

export type ImagesQueryVariables = Exact<{ [key: string]: never; }>;


export type ImagesQuery = { __typename?: 'Query', images: Array<{ __typename?: 'Image', _id: string, date_created: string, date_posted: string, posted?: Maybe<boolean>, url?: Maybe<string> }> };


export const CreateArticleDocument = gql`
    mutation createArticle($title: String!, $content: String!, $topic: String!) {
  createArticle(title: $title, topic: $topic, content: $content)
}
    `;

export const CreateArticleComponent = (props: Omit<Urql.MutationProps<CreateArticleMutation, CreateArticleMutationVariables>, 'query'> & { variables?: CreateArticleMutationVariables }) => (
  <Urql.Mutation {...props} query={CreateArticleDocument} />
);


export function useCreateArticleMutation() {
  return Urql.useMutation<CreateArticleMutation, CreateArticleMutationVariables>(CreateArticleDocument);
};
export const ArticleDocument = gql`
    query Article($id: ID!) {
  article(id: $id) {
    _id
    title
    topic
    content
    posted
    date_posted
    date_created
  }
}
    `;

export const ArticleComponent = (props: Omit<Urql.QueryProps<ArticleQuery, ArticleQueryVariables>, 'query'> & { variables: ArticleQueryVariables }) => (
  <Urql.Query {...props} query={ArticleDocument} />
);


export function useArticleQuery(options: Omit<Urql.UseQueryArgs<ArticleQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ArticleQuery>({ query: ArticleDocument, ...options });
};
export const ArticlesDocument = gql`
    query Articles($topic: String!) {
  articles(topic: $topic) {
    _id
    title
    topic
    content
    date_created
    date_posted
    posted
  }
}
    `;

export const ArticlesComponent = (props: Omit<Urql.QueryProps<ArticlesQuery, ArticlesQueryVariables>, 'query'> & { variables: ArticlesQueryVariables }) => (
  <Urql.Query {...props} query={ArticlesDocument} />
);


export function useArticlesQuery(options: Omit<Urql.UseQueryArgs<ArticlesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ArticlesQuery>({ query: ArticlesDocument, ...options });
};
export const ImagesDocument = gql`
    query Images {
  images {
    _id
    date_created
    date_posted
    posted
    url
  }
}
    `;

export const ImagesComponent = (props: Omit<Urql.QueryProps<ImagesQuery, ImagesQueryVariables>, 'query'> & { variables?: ImagesQueryVariables }) => (
  <Urql.Query {...props} query={ImagesDocument} />
);


export function useImagesQuery(options: Omit<Urql.UseQueryArgs<ImagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ImagesQuery>({ query: ImagesDocument, ...options });
};