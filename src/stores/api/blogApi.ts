import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IGettedSinfleArticle, IGettedArticles } from '../../types/types';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    getArticles: builder.query<IGettedArticles, number>({
      query: (offset) => ({
        url: 'articles',
        params: {
          offset,
          limit: 5,
        },
      }),
    }),
    getSingleArticle: builder.query<IGettedSinfleArticle, string>({
      query: (slug) => ({
        url: `articles/${slug}`,
      }),
    }),
  }),
});

export const { useGetArticlesQuery, useGetSingleArticleQuery } = blogApi;
