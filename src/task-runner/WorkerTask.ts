import { Task } from './Task';
import { TASK_STATE } from './const';
import ThreadPool from '../thread-pool/ThreadPool';
import { Deferred } from '../interface/util';

export class WorkerTask extends Task {
  constructor(action: Function, ...args: any[]) {
    super(action, ...args);
  }

  public process(pool?: ThreadPool): void {
    if (this.state === TASK_STATE.ABORT) {
      this.abort();
    }

    if (pool) {
      this.action(pool);
    }
  }

  protected initAction(deferred: Deferred, action: Function, args: any[]): void {
    this.action = (pool: ThreadPool) => {
      pool
        .run(action, args)
        .error(e => {
          this.error(e);
        })
        .done(r => {
          this.done(r);
        });
    };
  }
}
