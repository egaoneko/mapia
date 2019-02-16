import Renderer from './Renderer';
import BaseMap from '../map/BaseMap';
import CanvasRenderer from './canvas/CanvasRenderer';
import TileGrid from '../tile-grid/TileGrid';
import Layer from '../layer/Layer';
import { Point } from '../interface/coordinate';
import { BrowserEvent } from '../interface/baseEvent';

export default class MapRenderer extends Renderer {
  public get origin(): Point {
    return this._origin;
  }

  private map: BaseMap;
  private tileGrid: TileGrid;
  private renderer: CanvasRenderer;
  private _origin: Point = { x: 0, y: 0 };
  private width: number = 0;
  private height: number = 0;

  constructor(map: BaseMap) {
    super();

    this.map = map;
    this.tileGrid = new TileGrid();

    this.renderer = new CanvasRenderer();
    this._canvas = this.renderer.canvas;
    this._ctx = this.renderer.ctx;
    this.initCanvas(this.canvas);
    this.initEvent(this.map);
  }

  public resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.renderer.resize(width, height);
  }

  public render(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.map.layers.forEach((layer: Layer) => {
      this.drawRenderer(layer.renderer);
    });
  }

  private initCanvas(canvas: HTMLCanvasElement): void {
    canvas.style.cssText = 'width: 100%; height: 100%; display: block';
    this.map.element.appendChild(canvas);
  }

  private initEvent(map: BaseMap): void {
    const start: Point = {
      x: 0,
      y: 0
    };

    map.addEventListener('dragstart', (e: BrowserEvent) => {
      const origin: MouseEvent = e.origin;
      start.x = origin.clientX;
      start.y = origin.clientY;
    });
    map.addEventListener('drag', (e: BrowserEvent) => {
      const origin: MouseEvent = e.origin;
      const mX: number = origin.clientX;
      const mY: number = origin.clientY;
      this._origin.x += mX - start.x;
      this._origin.y += mY - start.y;
      start.x = mX;
      start.y = mY;
      requestAnimationFrame(() => {
        this.map.render();
      });
    });
  }

  private drawRenderer(renderer: Renderer): void {
    const canvas: HTMLCanvasElement = renderer.canvas;

    if (!canvas) {
      return;
    }

    if (!canvas.width || !canvas.height) {
      return;
    }
    this.ctx.drawImage(canvas, 0, 0);
  }
}
