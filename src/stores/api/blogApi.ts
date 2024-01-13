import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IGettedSingleArticle,
  IGettedArticles,
  IGettedRegisteredUser,
  ISignUpUserBody,
  ISignInUserBody,
  IEditProfileData,
} from '../../types/types';

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
    getSingleArticle: builder.query<IGettedSingleArticle, string>({
      query: (slug) => ({
        url: `articles/${slug}`,
      }),
    }),
    signUpUser: builder.mutation<IGettedRegisteredUser, ISignUpUserBody>({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
    }),
    signInUser: builder.mutation<IGettedRegisteredUser, ISignInUserBody>({
      query: (body) => ({
        url: 'users/login',
        method: 'POST',
        body,
      }),
    }),
    editUserProfile: builder.mutation<IGettedRegisteredUser, IEditProfileData>({
      query: ({ body, token }) => ({
        url: 'user',
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
        },
        body,
      }),
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetSingleArticleQuery,
  useSignUpUserMutation,
  useSignInUserMutation,
  useEditUserProfileMutation,
} = blogApi;
