// https://github.com/andywer/threadpool-js/blob/master/src/ThreadPool/WorkerWrapper.js

import EventEmitter from 'eventemitter3';

/**
 * Wrapping the WebWorker in an event emitter
 * (Because removeAllListeners() is quite a nice feature...)
 */
export default class WorkerWrapper extends EventEmitter {
  private worker: Worker;

  constructor(url: string) {
    super();

    const worker: Worker = new Worker(url);
    this.worker = worker;

    worker.addEventListener('message', this.emit.bind(this, 'message'));
    worker.addEventListener('error', this.emit.bind(this, 'error'));
  }

  public postMessage(...args: [any, Transferable[]]): void {
    this.worker.postMessage.apply(this.worker, args);
  }

  public terminate(): void {
    this.worker.terminate();
  }
}
