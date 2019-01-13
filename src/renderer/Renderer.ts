import Map from '../map/Map';
import Base from '../Base';

export default abstract class Renderer extends Base {
  protected map: Map;

  protected constructor(map: Map) {
    super();
    this.map = map;
  }
}
