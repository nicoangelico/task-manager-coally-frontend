"use client";

import Image from "next/image";
import { useGetTaskQuery, useDeleteTaskMutation, useUpdateTaskMutation } from '@redux/features/task/taskApi'
import { useParams, useRouter } from "next/navigation";
import { skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";
import { PageTitle } from "components/pageTitle";
import { TASK_STATUS } from "core/task";
import { formatText } from "core/text";
import { useEffect } from "react";
import { handleError, handleSuccess } from "core/commons";
import { ApiError } from "interfaces/error";

export default function TaskList() {
  const router = useRouter();
  const params = useParams();
  const taskId = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const { data: task } = useGetTaskQuery(taskId || skipToken);
  const [deleteTask, {isError, error, isSuccess, isLoading}] = useDeleteTaskMutation();
  const [updateTask, {isError: isErrorUpdated, error: errorUpdated, isSuccess: isSuccessUpdated}] = useUpdateTaskMutation();

  useEffect(() => {
    if (isError) {
      const apiError = error as ApiError; 
      handleError(apiError.data.message || 'An error occurred');
    };
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      handleSuccess('Successful');
      router.push(`/task`);
    };
  }, [isSuccess, router]);

  useEffect(() => {
    if (isErrorUpdated) {
      const apiError = errorUpdated as ApiError; 
      handleError(apiError.data.message || 'An error occurred');
    };
  }, [isErrorUpdated]);

  useEffect(() => {
    if (isSuccessUpdated) {
      handleSuccess('Successful');
    };
  }, [isSuccessUpdated]);

  const confirmDeleteTask = (taskId: string) => {
    if (window.confirm('Do you really want to remove this task?')) {
      deleteTask(taskId);
    }
  };

  const changeTaskStatus = () => {
    const data = {
      taskId: task._id,
      isCompleted: !task.isCompleted,
    };
    updateTask(data);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <PageTitle title={'Task'}/>

        {!!task &&
        <>
        <div className="flex flex-row gap-4 justify-center">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            type="button"
            onClick={() => changeTaskStatus()}
            >
            Mark as {formatText(task.isCompleted ? TASK_STATUS.PENDING : TASK_STATUS.COMPLETED)}
          </button>
        </div>
        <div className="list-inside list-decimal text-sm sm:text-left font-[family-name:var(--font-geist-mono)]">
          <label>Title: {formatText(task.title)}</label>
          <br/>
          <br/>
          <p>Description:</p>
          <p>{task.description}</p>
          <br/>
          <p>Status: {formatText(task.isCompleted ? TASK_STATUS.COMPLETED : TASK_STATUS.PENDING)}</p>
          <p>Priority: {task.priority.toString().toLocaleUpperCase()}</p>
        </div>

        <div className="flex flex-row gap-4 justify-center">
          <Link
            href={`/task/${task._id}/edit`}
            passHref
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Edite
          </Link>
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            type="button"
            onClick={() => confirmDeleteTask(task._id)}
            >
              <Image
                className="dark:invert"
                src="/trash-fill.svg"
                alt="Trasj icon"
                width={20}
                height={20}
              />
              Delete
            </button>
          <Link
            href={'/task'}
            passHref
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-32"
            >
            Go Back
          </Link>
        </div>
        </>
        }
        {!task && !isLoading &&
          <div className="flex flex-col gap-4">
            <p>Task not found</p>
            <Link
              href={'/task'}
              passHref
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-32"
              >
              Go Back
            </Link>
          </div>
        }
      </main>
    </div>
  );
}
