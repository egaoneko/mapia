import Renderer from '../Renderer';
import BaseMap from '../../map/BaseMap';
import { createCanvasContext2D } from '../../util/dom';
import { BROWSER_EVENT } from '../../enum/event';

export default class CanvasRenderer extends Renderer {
  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  private _canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;

  constructor(map: BaseMap) {
    super(map);

    if (!map.element) {
      throw new Error('Can not found target.');
    }

    this.initCanvas();
  }

  public destroy(): void {}

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
  }
}
