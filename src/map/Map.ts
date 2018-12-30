import Base from '../Base';
import { Option } from '../interface/Map';

export default abstract class Map extends Base {

  public get element(): HTMLElement | undefined {
    return this.target;
  }

  protected static DEFAULT_OPTION: Option = {
  }

  protected option: Option;
  protected target: HTMLElement | undefined;

  constructor(option: Option) {
    super();
    this.option = {
      ...Map.DEFAULT_OPTION,
      ...option
    };
    this.init();
  }

  public abstract resize(): void;

  private init(): void {
    const option: Option = this.option;
    this.initTarget(option);
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
}