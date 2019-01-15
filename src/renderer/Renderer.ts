import BaseMap from '../map/BaseMap';
import Base from '../Base';

export default abstract class Renderer extends Base {
  protected map: BaseMap;

  protected constructor(map: BaseMap) {
    super();
    this.map = map;
  }
}
