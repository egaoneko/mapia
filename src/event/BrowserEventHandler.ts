import BaseMap from '../map/BaseMap';
import { BrowserEvent, Option } from '../interface/baseEvent';
import Base from '../Base';
import { BROWSER_EVENT } from '../enum/event';
import { getMousePixel } from '../util/dom';
import { Point } from '../interface/coordinate';

export default class BrowserEventHandler extends Base {
  private map: BaseMap;
  private readonly target: HTMLElement;
  private handlerMap: Map<string, any> = new Map();

  constructor(option: Option) {
    super();
    this.map = option.map;
    this.target = this.map.element;
    this.initEvent(this.target);
  }

  public destroy(): void {
    Array.from(this.handlerMap.entries()).forEach(([event, handler]: [string, any]) => {
      this.target.removeEventListener(event, handler);
    });
  }

  private initEvent(target: HTMLElement): void {
    Object.values(BROWSER_EVENT).forEach((event: string) => {
      const handler: any = (e: Event) => {
        this.map.dispatchEvent({
          type: event,
          target: this.map.element,
          origin: e,
          pixel: getMousePixel(this.map.element, e)
        } as BrowserEvent);
      };
      this.handlerMap.set(event, handler);
      target.addEventListener(event, handler);
    });
  }
}
