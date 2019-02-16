import Base from '../Base';
import { Option } from '../interface/renderer';

export default class Renderer extends Base {
  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  public get ctx(): CanvasRenderingContext2D {
    return this._ctx;
  }

  protected _canvas!: HTMLCanvasElement;
  protected _ctx!: CanvasRenderingContext2D;

  constructor() {
    super();
  }
}
