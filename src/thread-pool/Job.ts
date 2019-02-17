// https://github.com/andywer/threadpool-js/blob/master/src/ThreadPool/Job.js

import EventEmitter, { ListenerFn } from 'eventemitter3';

function arrayEquals(a: string[] | null, b: string[] | null): boolean {
  if (!a || !b) {
    return false;
  }

  return !(a < b || a > b);
}

export default class Job extends EventEmitter {
  private param: any | any[];
  private transferBuffers: Transferable[] | null;
  private importScripts: string[];
  private scriptArgs: string[] | null;
  private scriptBody: string | null;
  private scriptFile: string | null;

  /**
   *  @param {String} script              Script filename or function.
   *  @param {Object|Array} [param]       Optional. Parameter (or array of parameters) to be passed to the thread or false/undefined.
   *  @param {Object[]} [transferBuffers] Optional. Array of buffers to be transferred to the worker context.
   */
  constructor(
    script: string | Function | null,
    param: any | any[],
    transferBuffers: Transferable[] | null
  ) {
    super();

    this.param = param;
    this.transferBuffers = transferBuffers;
    this.importScripts = [];

    if (typeof script === 'function') {
      const funcStr = script.toString();
      this.scriptArgs = funcStr
        .substring(funcStr.indexOf('(') + 1, funcStr.indexOf(')'))
        .split(',');
      this.scriptBody = funcStr.substring(funcStr.indexOf('{') + 1, funcStr.lastIndexOf('}'));
      this.scriptFile = null;
    } else {
      this.scriptArgs = null;
      this.scriptBody = null;
      this.scriptFile = script;
    }
  }

  public getParameter(): any | any[] {
    return this.param;
  }

  public getImportScripts(): string[] {
    return this.importScripts;
  }

  public setImportScripts(scripts: string[]) {
    this.importScripts = scripts;
  }

  public getBuffersToTransfer(): Transferable[] | null {
    return this.transferBuffers;
  }

  /**
   * Usage:  var f = Function.apply(null, args.concat(body));
   *         (`Function.apply()` replaces `new Function()`)
   */
  public getFunction(): { args: string[] | null; body: string | null } | null {
    if (!this.scriptArgs) {
      return null;
    }

    return {
      args: this.scriptArgs,
      body: this.scriptBody
    };
  }

  public getScriptFile(): string | null {
    return this.scriptFile;
  }

  /// @return True if `otherJob` uses the same function / same script as this job.
  public functionallyEquals(otherJob: Job): boolean {
    return (
      otherJob &&
      otherJob instanceof Job &&
      arrayEquals(otherJob.scriptArgs, this.scriptArgs) &&
      otherJob.scriptBody === this.scriptBody &&
      otherJob.scriptFile === this.scriptFile
    );
  }

  public start(callback: ListenerFn): Job {
    return this.on('start', callback);
  }

  public done(callback: ListenerFn): Job {
    return this.on('done', callback);
  }

  public error(callback: ListenerFn): Job {
    return this.on('error', callback);
  }
}
