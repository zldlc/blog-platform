import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  ISingleArticleResponse,
  IArticlesResponse,
  IUserResponse,
  IRegistrationUserRequest,
  ILoginUserRequest,
  IEditProfileRequest,
  ICreateArticleRequest,
  IDeleteArticleRequest,
  IUpdateArticleRequest,
  IToggleLikeRequest,
  IArticlesRequest,
} from '../../types/types';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['Articles', 'Article'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blog.kata.academy/api/' }),
  endpoints: (builder) => ({
    getArticles: builder.query<IArticlesResponse, IArticlesRequest>({
      query: ({ offset, token }) => ({
        url: 'articles',
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          offset,
          limit: 5,
        },
      }),
      providesTags: (result) =>
        result?.articles
          ? [
              ...result.articles.map(({ slug }) => ({ type: 'Articles' as const, slug })),
              { type: 'Articles', id: 'LIST' },
            ]
          : [{ type: 'Articles', id: 'LIST' }],
    }),
    getSingleArticle: builder.query<ISingleArticleResponse, IDeleteArticleRequest>({
      query: ({ slug, token }) => ({
        url: `articles/${slug}`,
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      providesTags: ['Article'],
    }),
    signUpUser: builder.mutation<IUserResponse, IRegistrationUserRequest>({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
    }),
    signInUser: builder.mutation<IUserResponse, ILoginUserRequest>({
      query: (body) => ({
        url: 'users/login',
        method: 'POST',
        body,
      }),
    }),
    editUserProfile: builder.mutation<IUserResponse, IEditProfileRequest>({
      query: ({ body, token }) => ({
        url: 'user',
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
        },
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    createAnArticle: builder.mutation<void, ICreateArticleRequest>({
      query: ({ body, token }) => ({
        url: 'articles',
        method: 'POST',
        body,
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    deleteAnArticle: builder.mutation<void, IDeleteArticleRequest>({
      query: ({ slug, token }) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
    updateAnArticle: builder.mutation<void, IUpdateArticleRequest>({
      query: ({ body, slug, token }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
        },
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'Article'],
    }),
    toggleLike: builder.mutation<void, IToggleLikeRequest>({
      query: ({ slug, token, isLike }) => ({
        url: `articles/${slug}/favorite`,
        method: !isLike ? 'POST' : 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'Article'],
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetSingleArticleQuery,
  useSignUpUserMutation,
  useSignInUserMutation,
  useEditUserProfileMutation,
  useCreateAnArticleMutation,
  useDeleteAnArticleMutation,
  useUpdateAnArticleMutation,
  useToggleLikeMutation,
} = blogApi;
