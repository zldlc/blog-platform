import { configureStore } from '@reduxjs/toolkit';
import articlesListSlice from './slices/articlesSlice';
import { blogApi } from './api/blogApi';

export const store = configureStore({
  reducer: {
    articlesList: articlesListSlice,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
