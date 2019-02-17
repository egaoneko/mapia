export default class Queue<T> {
  private store: { [key: number]: T } = {};
  private front: number = 0;
  private end: number = 0;

  public get size(): number {
    return this.end - this.front;
  }

  constructor() {
    this.clear();
  }

  public clear(): void {
    this.store = {};
    this.front = 0;
    this.end = 0;
  }

  public enqueue(data: T): void {
    this.store[this.end] = data;
    this.end++;
  }

  public dequeue(): T | null {
    if (this.front === this.end) {
      return null;
    }

    const data = this.store[this.front];
    delete this.store[this.front];
    this.front++;
    return data;
  }

  public peek(): T | null {
    if (this.size === 0) {
      return null;
    }

    return this.store[this.front];
  }
}
