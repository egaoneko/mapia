export interface Option {
  processLimitTime?: number;
}

export interface TaskPriority {
  [priority: string]: Priority;
}

export interface Priority {
  key: string;
  priority: number;
}

export interface TaskState {
  [key: string]: number;
}

export interface TaskRunnerStatus {
  key: string;
  priority?: Priority;
  queue: number;
}
