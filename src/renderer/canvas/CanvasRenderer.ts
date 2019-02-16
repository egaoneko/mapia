import Renderer from '../Renderer';
import { createCanvasContext2D } from '../../util/dom';
import { Option } from '../../interface/renderer';

export default class CanvasRenderer extends Renderer {
  constructor(option: Option = {}) {
    super();
    this.initCanvas(option);
  }

  public resize(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  private initCanvas(option: Option): void {
    const ctx: CanvasRenderingContext2D | null = createCanvasContext2D();

    if (!ctx) {
      throw new Error('Can not get context from canvas.');
    }

    this._ctx = ctx;
    this._canvas = this._ctx.canvas;

    if (option.width && option.height) {
      this.resize(option.width, option.height);
    }
  }
}
