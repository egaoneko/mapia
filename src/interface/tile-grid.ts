import { Coordinate } from './coordinate';
import { Extent } from './extent';

export interface Option {
  origin?: Coordinate;
  extent?: Extent;
  minZoom?: number;
  tileSize?: number[];
}
