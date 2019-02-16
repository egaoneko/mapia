import { Option } from '../interface/layer';
import Layer from './Layer';
import ImageTileSource from '../source/ImageTileSource';
import CanvasRenderer from '../renderer/canvas/CanvasRenderer';
import BaseMap from '../map/BaseMap';
import { Point } from '../interface/coordinate';

export default class ImageTileLayer extends Layer {
  public source?: ImageTileSource;

  protected _renderer: CanvasRenderer;

  constructor(option: Option = {}) {
    super();

    this.source = option.source as ImageTileSource;
    this._renderer = new CanvasRenderer();
  }

  protected _render(map: BaseMap): void {
    const [width, height] = map.size;
    this._renderer.resize(width, height);

    const origin: Point = map.renderer.origin;
    this._renderer.ctx.fillRect(origin.x, origin.y, 256, 256);
  }
}
