import { combineReducers } from '@reduxjs/toolkit';
import authReducer, { IInitialState } from './features/user/userSlice';
import { taskManagerApi } from './taskManagerApi';

const rootReducer = combineReducers({
  auth: authReducer,
  [taskManagerApi.reducerPath]: taskManagerApi.reducer,
});

export default rootReducer;

export interface RootState {
  auth: IInitialState,
}