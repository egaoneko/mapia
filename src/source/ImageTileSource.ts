import Source from './Source';
import { Option } from '../interface/source';
import ImageTile from '../tile/ImageTile';

export default class ImageTileSource extends Source {
  private url: string;
  private tileCache: Map<string, ImageTile> = new Map();

  constructor(option: Option = {}) {
    super();
    this.url = option.url ? option.url : 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  }

  public getTile(z: number, x: number, y: number): ImageTile {
    const tile: ImageTile = new ImageTile(this.getTileUrl(z, x, y));
    this.tileCache.set(`${z}:${x}:${y}`, tile);
    return tile;
  }

  private getTileUrl(z: number, x: number, y: number): string {
    return this.url
      .replace('{z}', z.toString())
      .replace('{x}', x.toString())
      .replace('{y}', y.toString());
  }
}
