// https://github.com/andywer/threadpool-js/blob/master/src/ThreadPool/WorkerFactory.js

import EventEmitter from 'eventemitter3';

import Worker from './WorkerWrapper';
import genericWorker from './genericWorker';

const genericWorkerDataUri: string = genericWorker.dataUri;

export default class WorkerFactory extends EventEmitter {
  public runScriptFile(
    url: string | null,
    parameter: any | any[],
    transferBuffers: Transferable[] = []
  ): Worker | null {
    if (!url) {
      return null;
    }

    const worker: Worker = new Worker(url);
    this.emit('new', worker);

    this.passParamsToWorkerScript(worker, parameter, transferBuffers);
    return worker;
  }

  public runCode(
    fn: { args: string[] | null; body: string | null } | null,
    parameter: any | any[],
    importScripts: string[] = [],
    transferBuffers: Transferable[] = []
  ): Worker {
    let worker: Worker;

    try {
      worker = new Worker(genericWorkerDataUri);
    } catch (error) {
      throw error;
    }

    this.emit('new', worker);
    this.passParamsToGenericWorker(worker, fn, parameter, importScripts, transferBuffers);

    return worker;
  }

  public passParamsToWorkerScript(
    worker: Worker | null,
    parameter: any | any[],
    transferBuffers: Transferable[]
  ): void {
    if (!worker) {
      return;
    }

    worker.postMessage(parameter, transferBuffers);
  }

  public passParamsToGenericWorker(
    worker: Worker | null,
    fn: { args: string[] | null; body: string | null } | null,
    parameter: any | any[],
    importScripts: string[],
    transferBuffers: Transferable[]
  ): void {
    if (!worker) {
      return;
    }

    worker.postMessage(
      {
        function: fn,
        importScripts: importScripts,
        parameter: parameter
      },
      transferBuffers
    );
  }
}
