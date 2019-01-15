import Base from '../Base';
import { Coordinate } from '../interface/coordinate';
import { Option } from '../interface/view';
import { Extent } from '../interface/extent';

export default class View extends Base {
  private center: Coordinate;
  private extent: Extent;
  private zoom: number;
  private minZoom: number;
  private maxZoom: number;

  constructor(option: Option = {}) {
    super();

    this.center = typeof option.center !== 'undefined' ? option.center : [0, 0];
    this.zoom = typeof option.zoom !== 'undefined' ? option.zoom : 1;
    this.minZoom = typeof option.minZoom !== 'undefined' ? option.minZoom : 0;
    this.maxZoom = typeof option.maxZoom !== 'undefined' ? option.maxZoom : 28;

    this.extent = typeof option.extent !== 'undefined' ? option.extent : [0, 0, 0, 0];
  }
}
