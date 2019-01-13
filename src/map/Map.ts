import Base from '../Base';
import { Option } from '../interface/Map';
import Renderer from '../renderer/Renderer';
import MapRenderer from '../renderer/MapRenderer';
import View from '../view/View';

export default class Map extends Base {
  public get element(): HTMLElement {
    return this.target;
  }

  protected option: Option;
  protected target!: HTMLElement;
  private renderer!: Renderer;
  private view!: View;

  constructor(option: Option = {}) {
    super();
    this.option = {
      ...option
    };
    this.init();
  }

  public resize(): void {}

  private init(): void {
    const option: Option = this.option;
    this.initTarget(option);
    this.initRenderer();
    this.initView();
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

  private initRenderer(): void {
    this.renderer = new MapRenderer(this);
  }
  private initView(): void {
    this.view = new View();
  }
}
