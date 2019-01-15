import BaseMap from '../map/BaseMap';
import { Option } from '../interface/interaction';
import Base from '../Base';
import { BROWSER_EVENT } from '../enum/event';
import { Event } from '../interface/event';
import { INTERACTION } from '../enum/interaction';

export default class Interaction extends Base {
  private readonly map: BaseMap;
  private dragstartHandler: Function = (e: Event) => {
    this.map.dispatchEvent({
      type: INTERACTION.DRAGSTART,
      target: this.map.element,
      origin: e.origin
    });
  };

  constructor(option: Option) {
    super();
    this.map = option.map;
    this.initDrag(this.map);
  }

  public destroy(): void {
    if (this.dragstartHandler) {
      this.map.removeEventListener(BROWSER_EVENT.MOUSEDOWN, this.dragstartHandler);
    }
  }

  private initDrag(map: BaseMap): void {
    const dragHandler: any = (e: Event) => {
      this.map.dispatchEvent({
        type: INTERACTION.DRAG,
        target: this.map.element,
        origin: e
      });
    };
    const dragEndHandler: any = (e: Event) => {
      this.map.dispatchEvent({
        type: INTERACTION.DRAGEND,
        target: this.map.element,
        origin: e
      });
      document.removeEventListener(BROWSER_EVENT.MOUSEMOVE, dragHandler);
      document.removeEventListener(BROWSER_EVENT.MOUSEUP, dragEndHandler);
    };

    this.dragstartHandler = (e: Event) => {
      this.map.dispatchEvent({
        type: INTERACTION.DRAGSTART,
        target: this.map.element,
        origin: e.origin
      });

      document.addEventListener(BROWSER_EVENT.MOUSEMOVE, dragHandler);
      document.addEventListener(BROWSER_EVENT.MOUSEUP, dragEndHandler);
    };
    map.addEventListener(BROWSER_EVENT.MOUSEDOWN, this.dragstartHandler);
  }
}
