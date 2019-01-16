import { BaseEvent } from '../interface/baseEvent';

export default class EventTarget {
  private listeners: { [type: string]: Function[] } = {};

  public addEventListener(type: string, callback: Function): void {
    if (!(type in this.listeners)) {
      this.listeners[type] = [];
    }

    this.listeners[type].push(callback);
  }

  public removeEventListener(type: string, callback: Function): void {
    if (!(type in this.listeners)) {
      return;
    }

    const stack: Function[] = this.listeners[type];
    const l: number = stack.length;

    for (let i: number = 0; i < l; i++) {
      if (stack[i] !== callback) {
        continue;
      }

      stack.splice(i, 1);
      return this.removeEventListener(type, callback);
    }
  }

  public dispatchEvent(event: BaseEvent): void {
    if (!(event.type in this.listeners)) {
      return;
    }

    const stack: Function[] = this.listeners[event.type];
    const l: number = stack.length;

    for (let i: number = 0; i < l; i++) {
      stack[i].call(this, event);
    }
  }
}
