import { Coordinate } from './coordinate';
import { Extent } from './extent';

export interface Option {
  center?: Coordinate;
  extent?: Extent;
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
}
