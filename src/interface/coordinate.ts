import { Extent } from './extent';

export type Coordinate = number[];

export type Point = {
  x: number;
  y: number;
};

export interface Option {
  origin?: Coordinate;
  center?: Coordinate;
  extent?: Extent;
}
