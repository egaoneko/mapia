import Map from '../map/Map';

export default abstract class Renderer {
  protected map: Map;

  protected constructor(map: Map) {
    this.map = map;
  }
}
