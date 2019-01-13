import Base from '../Base';
import { Coordinate } from '../interface/coordinate';
import { Option } from '../interface/tile-grid';

export default class TileGrid extends Base {
  private origin: Coordinate;

  constructor(option: Option = {}) {
    super();

    this.origin = typeof option.origin !== 'undefined' ? option.origin : [0, 0];
  }
}
