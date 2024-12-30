import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './rootReducer';

const BASE: string = process.env.API_URL || 'http://localhost:8000/api';

export const taskManagerApi = createApi({
  reducerPath: 'taskAPI',
  tagTypes: ['Task'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
