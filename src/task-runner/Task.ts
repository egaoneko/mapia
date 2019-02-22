import EventEmitter from 'eventemitter3';
import { defer } from '../util/common';
import { Deferred } from '../interface/util';
import { TASK_STATE } from './const';

export class Task extends EventEmitter {
  public get uuid(): string {
    return this._uuid;
  }

  public get promise(): Promise<any> {
    return this._promise;
  }

  protected action!: Function;
  protected state: number;

  private deferred: Deferred;
  private _uuid: string;
  private _promise: Promise<any>;

  constructor(action: Function, ...args: any[]) {
    super();
    this.deferred = defer();
    this._uuid = this.uuidv4();
    this.initAction(this.deferred, action, args);
    this.state = TASK_STATE.NORMAL;
    this._promise = this.deferred.promise;
  }

  public process(): void {
    if (this.state !== TASK_STATE.NORMAL) {
      if (this.state === TASK_STATE.ABORT) {
        this.abort();
      }
      return;
    }

    this.action();
  }

  protected initAction(deferred: Deferred, action: Function, args: any[]) {
    this.action = () => {
      let r: any;
      try {
        r = action.apply(null, args);
      } catch (e) {
        this.error(e);
        return;
      }
      this.done(r);
    };
  }

  protected error(e: any): void {
    this.deferred.reject(e);
    this.state = TASK_STATE.ERROR;
    this.emit('error', e);
  }

  protected done(r: any): void {
    this.deferred.resolve(r);
    this.state = TASK_STATE.DONE;
    this.emit('done', r);
  }

  protected abort(): void {
    this.deferred.resolve();
    this.state = TASK_STATE.ABORT;
    this.emit('abort');
  }

  private uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c: string): string {
      const r: number = (Math.random() * 16) | 0;
      const v: number = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
