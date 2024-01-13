import { configureStore } from '@reduxjs/toolkit';
import articlesListSlice from './slices/articlesSlice';
import userSlice from './slices/userSlice';
import { blogApi } from './api/blogApi';

export const store = configureStore({
  reducer: {
    articlesList: articlesListSlice,
    user: userSlice,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
