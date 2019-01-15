import Base from './Base';
import { Coordinate, Option, Point } from './interface/coordinate';
import { Extent } from './interface/extent';

export default class CoordinateSystem extends Base {
  private origin: Coordinate;
  private center: Point;
  private extent: Extent;

  constructor(option: Option = {}) {
    super();

    this.origin = typeof option.origin !== 'undefined' ? option.origin : [0, 0];
    this.center = Array.isArray(option.center)
      ? {
          x: option.center[0],
          y: option.center[1]
        }
      : {
          x: 0,
          y: 0
        };
    this.extent = typeof option.extent !== 'undefined' ? option.extent : [0, 0, 256, 256];
  }
}
