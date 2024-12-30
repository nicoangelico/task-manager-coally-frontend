import { ICreateTaskBody, IUpdateTaskBody } from '../../../interfaces/task';
import { taskManagerApi } from '../../taskManagerApi';

const FEATURE_BASE = 'task';

export const taskApi = taskManagerApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTask: build.query({
      query: ({ isCompleted, page = 0, take = 10, order = 'DESC', orderBy = 'createdAt' }) => {
        const params = new URLSearchParams();

        if (isCompleted !== undefined) {
          params.append('isCompleted', isCompleted.toString());
        }

        params.append('page', page.toString());
        params.append('take', take.toString());
        params.append('order', order);
        params.append('orderBy', orderBy);

        return {
          url: `/${FEATURE_BASE}/all?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: () => [{ type: 'Task', id: 'TASK_LIST' }],
    }),
    getTask: build.query({
      query: (taskId: string) => ({
        url: `/${FEATURE_BASE}/${taskId}`,
        method: 'GET',
      }),
      providesTags: () => [{ type: 'Task', id: 'TASK' }],
    }),
    createTask: build.mutation({
      query: (data: ICreateTaskBody) => ({
        url: `/${FEATURE_BASE}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Task', id: 'TASK_LIST' }],
    }),
    updateTask: build.mutation({
      query: ({taskId, ...data}: IUpdateTaskBody & { taskId: string }) => ({
        url: `/${FEATURE_BASE}/${taskId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [
        { type: 'Task', id: 'TASK' },
        { type: 'Task', id: 'TASK_LIST' }
      ],
    }),
    deleteTask: build.mutation({
      query: (taskId: string) => ({
        url: `/${FEATURE_BASE}/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'Task', id: 'TASK' },
        { type: 'Task', id: 'TASK_LIST' }
      ],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTaskQuery,
  useGetAllTaskQuery,
} = taskApi;
