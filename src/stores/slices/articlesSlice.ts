import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface articlesListState {
  currentPage: number;
}

const initialState: articlesListState = {
  currentPage: 1,
};

const articlesListSlice = createSlice({
  name: 'articlesList',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = articlesListSlice.actions;
export default articlesListSlice.reducer;
