import Base from '../Base';
import { TILE_STATE } from '../enum/tile';

export default class Tile extends Base {
  public get image(): HTMLElement | HTMLCanvasElement | undefined {
    throw new Error('Not yet implemented');
  }

  protected state: TILE_STATE = TILE_STATE.IDLE;

  constructor() {
    super();
  }
}
