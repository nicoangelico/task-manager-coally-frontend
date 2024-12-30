import { createSlice } from '@reduxjs/toolkit';
import { getApiToken, setApiToken, deleteApiToken } from '../../../core/storage';

export interface IInitialState {
  token: string | null,
  error: string | null,
  isSessionExpired: boolean,
}

let initialState: IInitialState = {
  token: null,
  error: null,
  isSessionExpired: false,
};

if (typeof window !== 'undefined') {
  initialState = {
    token: getApiToken(),
    error: null,
    isSessionExpired: false,
  };
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      setApiToken(action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
      deleteApiToken();
    },
  },
});

export const { setToken, setError, removeToken } = authSlice.actions;

export default authSlice.reducer;
