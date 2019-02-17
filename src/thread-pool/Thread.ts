// https://github.com/andywer/threadpool-js/blob/master/src/ThreadPool/Thread.js

import EventEmitter from 'eventemitter3';
import WorkerFactory from './WorkerFactory';
import ThreadPool from './ThreadPool';
import Job from './Job';
import Worker from './WorkerWrapper';

export default class Thread extends EventEmitter {
  private threadPool: ThreadPool;
  private factory: WorkerFactory;
  private worker: Worker | null;
  private currentJob: Job | null;
  private lastJob: Job | null;

  constructor(threadPool: ThreadPool) {
    super();

    this.threadPool = threadPool;
    this.factory = new WorkerFactory();
    this.worker = null;
    this.currentJob = null;
    this.lastJob = null;
  }

  public terminate(): void {
    if (!this.worker) {
      return;
    }
    this.worker.terminate();
    this.worker = null;
  }

  public run(job: Job): void {
    let needToInitWorker: boolean = true;
    const transferBuffers: Transferable[] = job.getBuffersToTransfer() || [];

    this.currentJob = job;
    this.factory.once('new', (worker: Worker) => {
      this.wireEventListeners(worker, job);
    });

    if (this.worker) {
      if (this.lastJob && this.lastJob.functionallyEquals(job)) {
        needToInitWorker = false;
      } else {
        this.worker.terminate();
        this.worker = null;
      }
    }

    job.emit('start');

    try {
      if (needToInitWorker) {
        if (job.getScriptFile()) {
          this.worker = this.factory.runScriptFile(
            job.getScriptFile(),
            job.getParameter(),
            transferBuffers
          );
        } else {
          this.worker = this.factory.runCode(
            job.getFunction(),
            job.getParameter(),
            job.getImportScripts(),
            transferBuffers
          );
        }
      } else {
        this.wireEventListeners(this.worker, job, true);

        if (job.getScriptFile()) {
          this.factory.passParamsToWorkerScript(this.worker, job.getParameter(), transferBuffers);
        } else {
          this.factory.passParamsToGenericWorker(
            this.worker,
            job.getFunction(),
            job.getParameter(),
            job.getImportScripts(),
            transferBuffers
          );
        }
      }
    } finally {
      // always remove all listeners (for this job), so they cannot be triggered when this function is later
      // called with a different job
      this.factory.removeAllListeners('new');
    }
  }

  public wireEventListeners(
    worker: Worker | null,
    job: Job,
    removeExisting: boolean = false
  ): void {
    if (!worker) {
      return;
    }

    if (removeExisting) {
      worker.removeAllListeners('message');
      worker.removeAllListeners('error');
    }

    worker.on('message', this.handleSuccess.bind(this, job));
    worker.on('error', this.handleError.bind(this, job));
  }

  public handleCompletion(job: Job): void {
    this.currentJob = null;
    this.lastJob = job;

    this.emit('done', job);
  }

  public handleSuccess(job: Job, event: any): void {
    if (this.currentJob) {
      this.currentJob.emit('done', event.data);
    }

    this.threadPool.emit('done', event.data);
    this.handleCompletion(job);
  }

  public handleError(job: Job, error: any): void {
    if (this.currentJob) {
      this.currentJob.emit('error', error);
    }

    this.threadPool.emit('error', error);
    this.handleCompletion(job);
  }
}
