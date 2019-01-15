import Base from '../Base';
import { Option } from '../interface/Map';
import Renderer from '../renderer/Renderer';
import MapRenderer from '../renderer/MapRenderer';
import View from '../view/View';
import Interaction from '../interaction/Interaction';
import BrowserEventHandler from '../event/BrowserEventHandler';

export default class BaseMap extends Base {
  public get element(): HTMLElement {
    return this.target;
  }

  protected option: Option;
  protected target!: HTMLElement;
  private renderer!: Renderer;
  private view!: View;
  private interaction!: Interaction;
  private browserEventHandler!: BrowserEventHandler;

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

  public resize(): void {}

  private init(): void {
    const option: Option = this.option;
    this.initTarget(option);
    this.initRenderer(this);
    this.initView();
    this.initInteraction(this);
    this.initBrowserEventHandler(this);
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
    this.renderer = new MapRenderer(map);
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
