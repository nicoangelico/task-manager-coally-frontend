export interface ICreateTaskBody {
  title: string;
  description?: string;
  priority?: string;
}

export interface IUpdateTaskBody {
  title?: string;
  description?: string;
  priority?: string;
  isCompleted?: boolean;
}

export interface ITask {
  _id: string;
  _userId: string;
  title: string;
  description?: string;
  priority: string;
  isCompleted: boolean;
  active: boolean;
  createdAt: string;
}