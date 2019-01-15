import BaseMap from '../map/BaseMap';

export interface Option {
  map: BaseMap;
}

export interface Event {
  type: any;
  target: any;
  origin: any;
}

export interface BrowserEvent extends Event {}
