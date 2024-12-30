export enum TASK_PRIORITY {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export const prioritiesList = [
  {value: TASK_PRIORITY.HIGH, label: TASK_PRIORITY.HIGH.toLocaleUpperCase()},
  {value: TASK_PRIORITY.MEDIUM, label: TASK_PRIORITY.MEDIUM.toLocaleUpperCase()},
  {value: TASK_PRIORITY.LOW, label: TASK_PRIORITY.LOW.toLocaleUpperCase()},
]

export enum TASK_STATUS {
  COMPLETED = 'completed',
  PENDING = 'pending',
}