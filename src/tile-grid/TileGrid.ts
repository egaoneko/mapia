import Base from '../Base';
import { Coordinate } from '../interface/coordinate';
import { Option } from '../interface/tile-grid';
import { Extent } from '../interface/extent';

export default class TileGrid extends Base {
  private origin: Coordinate;
  private extent: Extent;
  private tileSize: number[];
  private minZoom: number;

  constructor(option: Option = {}) {
    super();

    this.origin = typeof option.origin !== 'undefined' ? option.origin : [0, 0];
    this.extent = typeof option.extent !== 'undefined' ? option.extent : [0, 0, 256, 256];
    this.minZoom = typeof option.minZoom !== 'undefined' ? option.minZoom : 0;
    this.tileSize = typeof option.tileSize !== 'undefined' ? option.tileSize : [256, 256];
  }

  public getTileCoords(): Coordinate[] | null {
    return null;
  }
}
