import Base from '../Base';
import { Option } from '../interface/Map';
import Renderer from '../renderer/Renderer';
import CanvasRenderer from '../renderer/canvas/CanvasRenderer';

export default class Map extends Base {
  public get element(): HTMLElement {
    return this.target;
  }

  protected static DEFAULT_OPTION: Option = {};

  protected option: Option;
  protected target!: HTMLElement;
  private renderer!: Renderer;

  constructor(option: Option) {
    super();
    this.option = {
      ...Map.DEFAULT_OPTION,
      ...option
    };
    this.init();
  }

  public resize(): void {}

  private init(): void {
    const option: Option = this.option;
    this.initTarget(option);
    this.initRenderer();
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
    this.renderer = new CanvasRenderer(this);
  }
}
