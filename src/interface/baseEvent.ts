import BaseMap from '../map/BaseMap';
import { Point } from './coordinate';

export interface Option {
  map: BaseMap;
}

export interface BaseEvent {
  type: any;
  target: any;
  origin: any;
}

export interface BrowserEvent extends BaseEvent {
  pixel?: Point;
}
