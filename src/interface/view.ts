import { Coordinate } from './coordinate';

export interface Option {
  center?: Coordinate;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
}
