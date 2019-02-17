import { Deferred } from '../interface/util';

export function defer(): Deferred {
  const deferred: Deferred = {} as Deferred;
  deferred.promise = new Promise(
    (resolve: (value?: any | PromiseLike<any>) => void, reject: (reason?: any) => void) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    }
  );
  return deferred;
}
