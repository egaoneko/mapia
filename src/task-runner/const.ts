import { TaskPriority, TaskState } from '../interface/taskRunner';

export const TASK_PRIORITY: TaskPriority = {
  ESSENTIAL: { key: 'ESSENTIAL', priority: 0 },
  CRITICAL: { key: 'CRITICAL', priority: 1 },
  NORMAL: { key: 'NORMAL', priority: 2 },
  IDLE: { key: 'IDLE', priority: 3 }
};

export const TASK_STATE: TaskState = {
  NORMAL: 0,
  DONE: 1,
  ERROR: 2,
  ABORT: 3
};
