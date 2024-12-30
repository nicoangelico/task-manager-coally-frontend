"use client";

import { useFormik } from "formik";
import Image from "next/image";
import { useGetTaskQuery, useUpdateTaskMutation } from '@redux/features/task/taskApi'
import { prioritiesList, TASK_PRIORITY } from "core/task";
import { useEffect } from "react";
import { handleError, handleSuccess } from "core/commons";
import { useParams, useRouter } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { PageTitle } from 'components/pageTitle';
import { ApiError } from "interfaces/error";

export default function TaskList() {
  const router = useRouter();
  const params = useParams();
  const taskId = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const { data: task } = useGetTaskQuery(taskId || skipToken);
  const [updateTask, {isError, error, isSuccess}] = useUpdateTaskMutation();
  
    const formik = useFormik({
      initialValues: {
        title: '',
        description: '',
        priority: '',
      },
      onSubmit: (values, { setSubmitting }) => {
        const data = {
          ...values,
          taskId: task._id
        };
        updateTask(data);
        setSubmitting(false);
      },
    });

    useEffect(() => {
      if (task) {
        formik.setValues({
          title: task.title,
          description: task.description,
          priority: task.priority,
        });
      };
    }, [task]);
  
    useEffect(() => {
      if (isError) {
        const apiError = error as ApiError; 
        handleError(apiError.data.message || 'An error occurred');
      };
    }, [isError]);
  
    useEffect(() => {
      if (isSuccess) {
        handleSuccess('Successful');
        router.push(`/task/${task._id}`);
      };
    }, [isSuccess, router]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <PageTitle title={'Edit Task'}/>

        {!!task &&
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block mb-2 list-inside list-decimal text-sm sm:text-left font-[family-name:var(--font-geist-mono)]">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
                className="bg-black border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <small>{formik.errors.title && formik.touched.title && formik.errors.title}</small>
            </div>
            <div className="mb-6">
              <label htmlFor="description" className="block mb-2 list-inside list-decimal text-sm sm:text-left font-[family-name:var(--font-geist-mono)]">
                Description
              </label>
              <textarea 
                id="description"
                name="description"
                rows={10}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
                className="bg-black border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <small>{formik.errors.description && formik.touched.description && formik.errors.description}</small>
            </div>
            <div className="mb-6">
              <label htmlFor="priority" className="block mb-2 list-inside list-decimal text-sm sm:text-left font-[family-name:var(--font-geist-mono)]">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className="bg-black border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={formik.values.priority || TASK_PRIORITY.HIGH}
                onChange={formik.handleChange}
              >
                {prioritiesList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-row gap-4 justify-center">
              <button
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              type="submit"
                disabled={formik.isSubmitting}
              >
                <Image
                  className="dark:invert"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                />
                Done
              </button>
              <Link
                href={`/task/${task._id}`}
                passHref
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                >
                Go Back
              </Link>
            </div>
          </form>
        }
      </main>
    </div>
  );
}