import { ICreateUserBody, ILoginUserBody } from '../../../interfaces/user';
import { taskManagerApi } from '../../taskManagerApi';
import { setToken, setError } from './userSlice';

const FEATURE_BASE = 'user';

export const userApi = taskManagerApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data: ILoginUserBody) => ({
        url: `${FEATURE_BASE}/login`,
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (data, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.access_token));
        } catch (error: any) {
          dispatch(setError(error.error));
        }
      },
      invalidatesTags: [{ type: 'Task', id: 'USER_INFO' }],
    }),
    createUser: build.mutation({
      query: (data: ICreateUserBody) => ({
        url: `${FEATURE_BASE}/create`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useCreateUserMutation,
} = userApi;
