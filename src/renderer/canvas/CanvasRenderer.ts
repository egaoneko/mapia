import Renderer from '../Renderer';
import Map from '../../map/Map';
import { createCanvasContext2D } from '../../util/dom';

export default class CanvasRenderer extends Renderer {
  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  private _canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  constructor(map: Map) {
    super(map);

    if (!map.element) {
      throw new Error('Can not found target.');
    }

    this.initCanvas();
  }

  public resize(): void {
    if (!this.map.element || !this._canvas) {
      return;
    }

    this.canvas.width = this.map.element.clientWidth;
    this.canvas.height = this.map.element.clientHeight;
  }

  private initCanvas(): void {
    if (!this.map.element) {
      return;
    }

    const ctx: CanvasRenderingContext2D | null = createCanvasContext2D(
      this.map.element.clientWidth,
      this.map.element.clientHeight
    );

    if (!ctx) {
      throw new Error('Can not get context from canvas.');
    }

    this.ctx = ctx;
    this._canvas = this.ctx.canvas;

    this._canvas.style.cssText = 'width: 100%; height: 100%; display: block';
    this.map.element.appendChild(this._canvas);
  }
}
