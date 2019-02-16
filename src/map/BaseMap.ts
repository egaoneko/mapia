import Base from '../Base';
import { Option } from '../interface/Map';
import MapRenderer from '../renderer/MapRenderer';
import View from '../view/View';
import Interaction from '../interaction/Interaction';
import BrowserEventHandler from '../event/BrowserEventHandler';
import Layer from '../layer/Layer';

export default class BaseMap extends Base {
  public get element(): HTMLElement {
    return this.target;
  }

  public get size(): [number, number] {
    return [this.width, this.height];
  }

  public get layers(): Layer[] {
    return this._layers;
  }

  public get renderer(): MapRenderer {
    return this._renderer;
  }

  protected option: Option;
  protected target!: HTMLElement;
  private _renderer!: MapRenderer;
  private view!: View;
  private interaction!: Interaction;
  private browserEventHandler!: BrowserEventHandler;
  private _layers: Layer[] = [];
  private width: number = 0;
  private height: number = 0;

  constructor(option: Option = {}) {
    super();
    this.option = {
      ...option
    };
    this.init();
  }

  public destroy(): void {
    this.interaction.destroy();
    this.browserEventHandler.destroy();
  }

  public resize(): void {
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
    this._renderer.resize(this.width, this.height);
  }

  public addLayer(layer: Layer): void {
    if (!layer) {
      return;
    }

    this._layers.push(layer);
    this.render();
  }

  public render(): void {
    this.layers.forEach((layer: Layer) => {
      requestAnimationFrame(() => {
        layer.render(this);
      });
    });

    requestAnimationFrame(() => {
      this._renderer.render();
    });
  }

  private init(): void {
    const option: Option = this.option;
    this.initTarget(option);
    this.initRenderer(this);
    this.initView();
    this.initInteraction(this);
    this.initBrowserEventHandler(this);
    this.resize();
  }

  private initTarget(option: Option): void {
    let target: HTMLElement | null;

    if (!option.target) {
      throw new Error('Can not found target.');
    }

    if (typeof option.target === 'string') {
      target = document.querySelector(`#${option.target}`);
    } else {
      target = option.target;
    }

    if (!target || !(target instanceof HTMLElement)) {
      throw new Error('Invalid target.');
    }

    this.target = target;
  }

  private initRenderer(map: BaseMap): void {
    this._renderer = new MapRenderer(map);
  }

  private initView(): void {
    this.view = new View();
  }

  private initInteraction(map: BaseMap): void {
    this.interaction = new Interaction({ map });
  }

  private initBrowserEventHandler(map: BaseMap): void {
    this.browserEventHandler = new BrowserEventHandler({ map });
  }
}
