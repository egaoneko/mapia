import Base from '../Base';
import { Option } from '../interface/layer';
import Source from '../source/Source';
import BaseMap from '../map/BaseMap';
import Renderer from '../renderer/Renderer';

export default class Layer extends Base {
  public source?: Source;

  public get renderer(): Renderer {
    return this._renderer;
  }

  protected _renderer!: Renderer;

  constructor(option: Option = {}) {
    super();
    this.source = option.source;
  }

  public render(map: BaseMap): void {
    this._render(map);
    map.renderer.render();
  }

  protected _render(map: BaseMap): void {
    throw new Error('Not yet implemented');
  }
}
