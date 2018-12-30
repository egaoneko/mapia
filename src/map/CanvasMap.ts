import Map from './Map';
import { Option } from '../interface/Map';

export default class CanvasMap extends Map {

  public get canvas(): HTMLCanvasElement | undefined {
    return this._canvas;
  }

  private _canvas: HTMLCanvasElement | undefined;
  private ctx: CanvasRenderingContext2D | undefined | null;

  constructor(option: Option) {
    super(option);

    if (!this.target) {
      throw new Error('Can not found target.');
    }

    this.initCanvas();
  }

  public resize(): void {
    if (!this.target || !this._canvas) {
      return;
    }

    this._canvas.width = this.target.clientWidth;
    this._canvas.height = this.target.clientHeight;
  }

  private initCanvas(): void {
    if (!this.target) {
      return;
    }

    const canvas: HTMLCanvasElement = document.createElement('canvas');
    this._canvas = canvas;
    this.ctx = canvas.getContext('2d');

    canvas.style.display = 'block';
    this.resize();
    
    this.target.appendChild(canvas);
  }
}