// https://github.com/andywer/threadpool-js/blob/master/src/ThreadPool/ThreadPool.js

import EventEmitter, { ListenerFn } from 'eventemitter3';

import Job from './Job';
import Thread from './Thread';

function runDeferred(callback: (time: number) => void) {
  requestAnimationFrame(callback);
}

const DEFAULT_SIZE: number = 8;
export default class ThreadPool extends EventEmitter {
  private size: number;
  private pendingJobs: Job[];
  private idleThreads: Thread[];
  private activeThreads: Thread[];

  constructor(size: number = DEFAULT_SIZE) {
    super();

    this.size = size;
    this.pendingJobs = [];
    this.idleThreads = [];
    this.activeThreads = [];

    for (let i: number = 0; i < size; i++) {
      let thread: Thread = new Thread(this);
      thread.on('done', this.handleThreadDone.bind(this, thread));

      this.idleThreads.push(thread);
    }
  }

  public terminateAll(): void {
    const allThreads: Thread[] = this.idleThreads.concat(this.activeThreads);

    allThreads.forEach((thread: Thread) => {
      thread.terminate();
    });
  }

  /**
   * Usage: run ({String} WorkerScript [, {Object|scalar} Parameter[, {Object[]} BuffersToTransfer]] [, {Function} doneCallback(returnValue)])
   *        - or -
   *        run ([{String[]} ImportScripts, ] {Function} WorkerFunction(param, doneCB) [, {Object|scalar} Parameter[, {Object[]} BuffersToTransfer]] [, {Function} DoneCallback(result)])
   */
  public run(...args: any[]): Job {
    let workerScript!: string;
    let workerFunction!: Function;
    let importScripts: string[] | null = null;
    let parameter: any | any[];
    let transferBuffers: Transferable[] | null = null;
    let doneCb!: ListenerFn;
    let job: Job;

    if (args.length < 1) {
      throw new Error('run(): Too few parameters.');
    }

    if (typeof args[0] === 'string') {
      // 1st usage example (see doc above)
      workerScript = args.shift();
    } else {
      // 2nd usage example (see doc above)
      if (typeof args[0] === 'object' && args[0] instanceof Array) {
        importScripts = args.shift();
      }
      if (args.length > 0 && typeof args[0] === 'function') {
        workerFunction = args.shift();
      } else {
        throw new Error('run(): Missing obligatory thread logic function.');
      }
    }

    if (args.length > 0 && typeof args[0] !== 'function') {
      parameter = args.shift();
    }
    if (args.length > 0 && typeof args[0] !== 'function') {
      transferBuffers = args.shift();
    }
    if (args.length > 0 && typeof args[0] === 'function') {
      doneCb = args.shift();
    }
    if (args.length > 0) {
      throw new Error('run(): Unrecognized parameters: ' + args);
    }

    // Create job:
    if (workerScript) {
      job = new Job(workerScript, parameter, transferBuffers);
    } else {
      job = new Job(workerFunction, parameter, transferBuffers);
      if (importScripts && importScripts.length > 0) {
        job.setImportScripts(importScripts);
      }
    }

    if (doneCb) {
      job.on('done', doneCb);
    }

    // Run job:
    this.pendingJobs.push(job);
    runDeferred(this.runJobs.bind(this));

    return job;
  }

  public done(callback: ListenerFn): ThreadPool {
    return this.on('done', callback);
  }

  public error(callback: ListenerFn): ThreadPool {
    return this.on('error', callback);
  }

  public allDone(callback: ListenerFn): ThreadPool {
    return this.once('allDone', callback);
  }

  private runJobs(): void {
    if (this.idleThreads.length === 0 || this.pendingJobs.length === 0) {
      return;
    }

    const thread: Thread | undefined = this.idleThreads.shift();

    if (thread) {
      this.activeThreads.push(thread);

      const job: Job | undefined = this.pendingJobs.shift();

      if (job) {
        thread.run(job);
      }
    }
  }

  private handleThreadDone(thread: Thread): void {
    this.idleThreads.unshift(thread);
    this.activeThreads.splice(this.activeThreads.indexOf(thread), 1);
    this.runJobs();

    if (this.pendingJobs.length === 0 && this.activeThreads.length === 0) {
      this.emit('allDone');
    }
  }
}
