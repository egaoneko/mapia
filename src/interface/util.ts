export interface Deferred {
  promise: Promise<any>;
  resolve: (value?: any | PromiseLike<any>) => void;
  reject: (reason?: any) => void;
}
