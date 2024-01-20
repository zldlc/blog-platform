import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IUserResponse } from '../../types/types';

interface IUserState {
  user: IUserResponse | null;
}

const loggedUserString = localStorage.getItem('loggedUser');
const loggedUser = loggedUserString ? JSON.parse(loggedUserString) : null;

const initialState: IUserState = {
  user: loggedUser,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<IUserResponse>) => {
      state.user = action.payload;
      localStorage.setItem('loggedUser', JSON.stringify(action.payload));
    },
    logOutUser: (state, action: PayloadAction<null>) => {
      state.user = action.payload;
      localStorage.clear();
    },
    loginUser: (state, action: PayloadAction<IUserResponse>) => {
      state.user = action.payload;
      localStorage.setItem('loggedUser', JSON.stringify(action.payload));
    },
    updateUser: (state, action: PayloadAction<IUserResponse>) => {
      state.user = action.payload;
      localStorage.setItem('loggedUser', JSON.stringify(action.payload));
    },
  },
});

export const { registerUser, logOutUser, loginUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
