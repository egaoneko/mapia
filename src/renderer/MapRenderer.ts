import Renderer from './Renderer';
import Map from '../map/Map';
import CanvasRenderer from './canvas/CanvasRenderer';
import TileGrid from '../tile-grid/TileGrid';

export default class MapRenderer extends Renderer {
  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  public _canvas: HTMLCanvasElement;

  private tileGrid: TileGrid;
  private renderer: CanvasRenderer;

  constructor(map: Map) {
    super(map);

    this.tileGrid = new TileGrid();
    this.renderer = new CanvasRenderer(this.map);
    this._canvas = this.renderer.canvas;
    this.initCanvas(this.canvas);
  }

  private initCanvas(canvas: HTMLCanvasElement): void {
    canvas.style.cssText = 'width: 100%; height: 100%; display: block';
    this.map.element.appendChild(canvas);
  }
}
