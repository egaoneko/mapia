import Tile from './Tile';
import { TILE_STATE } from '../enum/tile';

export default class ImageTile extends Tile {
  public get image(): HTMLImageElement {
    return this._image;
  }

  private _image: HTMLImageElement = new Image();
  private _url: string;

  constructor(url: string) {
    super();
    this._url = url;
  }

  public load(): Promise<Tile> {
    this.state = TILE_STATE.LOADING;
    return new Promise<Tile>((resolve, reject) => {
      this.image.src = this._url;
      this.image.onload = () => {
        this.state = TILE_STATE.LOADED;
        resolve(this);
      };
      this.image.onerror = (err: Event | string) => {
        this.state = TILE_STATE.ERROR;
        reject(err);
      };
    });
  }
}
