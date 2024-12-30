"use client";

import Image from "next/image";
import { useGetAllTaskQuery } from '../../redux/features/task/taskApi'
import { ITask } from "../../interfaces/task";
import Link from "next/link";
import { PageTitle } from "components/pageTitle";
import { TASK_STATUS } from "core/task";
import { dateFormatMMDDYYYY } from "core/date";
import { formatText } from "core/text";
import { useState } from "react";

export default function TaskList() {
  const [filter, setFilter] = useState<string>("all");
  
  const isCompleted =
    filter === "completed" ? true : filter === "pending" ? false : undefined;

  const { data: tasks } = useGetAllTaskQuery({isCompleted});

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center min-w-full">
        <PageTitle title={'Task List'}/>

        <div className="flex flex-row gap-4 justify-center">
          <Link
            href={'/new-task'}
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
            New
          </Link>

          <div className="flex flex-row gap-4 justify-center">
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2 min-w-[300px]">
        {!!tasks && tasks.data.length > 0
          ? tasks.data.map((task: ITask, idx: number) => {
              return (
                <div key={'task-' + idx}>
                  <Link
                    href={`/task/${task._id}`}
                    passHref
                    className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-20 sm:h-25 px-4 sm:px-5 sm:min-w-44"
                    >
                    <div className="text-center">
                      <p>- {formatText(task.title)} -</p>
                      <p>{task.isCompleted ? TASK_STATUS.COMPLETED.toUpperCase() : TASK_STATUS.PENDING.toUpperCase()}</p>
                      <p className="text-xs sm:text-sm">{dateFormatMMDDYYYY(task.createdAt)}</p>
                    </div>
                  </Link>
                </div>
              );
            })
          : (
            <div className="flex flex-row gap-4 justify-center">
              <p>No tasks found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
