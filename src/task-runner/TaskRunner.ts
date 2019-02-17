import EventEmitter from 'eventemitter3';
import ThreadPool from '../thread-pool/ThreadPool';
import Queue from '../struct/queue';
import { Option, Priority, TaskRunnerStatus } from '../interface/taskRunner';
import { TASK_PRIORITY } from './const';
import { Task } from './Task';
import { WorkerTask } from './WorkerTask';

export default class TaskRunner extends EventEmitter {
  public get status(): TaskRunnerStatus[] {
    const status: TaskRunnerStatus[] = this.taskQueues.map(
      (p: Priority): TaskRunnerStatus => {
        const queue: Queue<Task> | undefined = this.taskQueueMap.get(p.key);
        return {
          key: p.key,
          priority: p,
          queue: queue ? queue.size : undefined
        } as TaskRunnerStatus;
      }
    );
    status.push({
      key: 'WORKER',
      queue: this.threadMap.size
    });
    return status;
  }

  private processLimitTime: number;
  private taskQueues: Priority[];
  private taskQueueMap: Map<string, Queue<Task>>;
  private threadMap: Map<string, Task>;
  private threadPool: ThreadPool;

  constructor(options: Option = {}) {
    super();

    this.processLimitTime = options.processLimitTime ? options.processLimitTime : 3;

    this.taskQueues = Object.values(TASK_PRIORITY).sort(
      (a: Priority, b: Priority): number => a.priority - b.priority
    );
    this.taskQueueMap = new Map();
    this.taskQueues.forEach(p => this.taskQueueMap.set(p.key, new Queue()));
    this.threadMap = new Map();
    this.threadPool = new ThreadPool();
    requestAnimationFrame(this.run.bind(this));
  }

  public terminate(priority: Priority): void {
    if (!priority || !this.taskQueueMap.has(priority.key)) {
      throw new Error(`This priority is not exist: ${priority.key}`);
    }

    const queue: Queue<Task> | undefined = this.taskQueueMap.get(priority.key);
    if (!queue) {
      return;
    }

    queue.clear();
    this.emit('terminate:priority', priority);
  }

  public terminateAll(): void {
    this.taskQueues.forEach(p => {
      const queue: Queue<Task> | undefined = this.taskQueueMap.get(p.key);

      if (!queue) {
        return;
      }

      queue.clear();
    });
    this.threadMap.clear();
    this.threadPool.terminateAll();
    this.emit('terminate:all');
  }

  public enroll(task: Task, priority: Priority): Promise<any> {
    if (!(task instanceof Task)) {
      throw new Error('This task is not instance of Task');
    }

    if (task instanceof WorkerTask) {
      this.threadMap.set(task.uuid, task);
      this.processThreadTask(task);
    } else {
      if (!priority || !this.taskQueueMap.has(priority.key)) {
        throw new Error(`This priority is not exist: ${priority.key}`);
      }

      const queue: Queue<Task> | undefined = this.taskQueueMap.get(priority.key);

      if (queue) {
        queue.enqueue(task);
      }
    }

    this.emit('task:enroll', task);

    return task.promise;
  }

  private run(taskStartTime: number): void {
    let taskFinishTime: number;

    do {
      const nextTask: Task | null = this.getTask();

      if (!nextTask) {
        break;
      }

      this.processTask(nextTask);

      taskFinishTime = window.performance.now();
    } while (taskFinishTime - taskStartTime < this.processLimitTime);

    requestAnimationFrame(this.run.bind(this));
  }

  private getTask(): Task | null {
    let task: Task | null = null;

    this.taskQueues.some(p => {
      const queue: Queue<Task> | undefined = this.taskQueueMap.get(p.key);

      if (!queue) {
        return false;
      }

      task = queue.dequeue();
      return !!task;
    });

    return task;
  }

  private processTask(task: Task): void {
    task.process();
    this.emit('task:process');
  }

  private processThreadTask(task: WorkerTask): void {
    task.process(this.threadPool);

    const update = () => {
      this.threadMap.delete(task.uuid);
      this.emit('worker-task:process');
    };
    task.once('done', update);
    task.once('error', update);
  }
}

if (!(window as any).perfomance || !(window as any).perfomance.now) {
  Date.now ||
    (Date.now = function() {
      return new this().getTime();
    });

  (window as any).perfomance || ((window as any).perfomance = {});

  const offset =
    ((window as any).perfomance.timing || ((window as any).perfomance.timing = {}))
      .navigatorStart || ((window as any).perfomance.timing.navigatorStart = Date.now());

  (window as any).perfomance.now = function() {
    return Date.now() - offset;
  };
}
