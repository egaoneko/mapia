import EventEmitter from 'eventemitter3';

export interface Option {
}

export class Map extends EventEmitter {
  private option: Option;

  constructor(option: Option) {
    super();
    this.option = option;
  }
}