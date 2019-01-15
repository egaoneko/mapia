import Renderer from '../../src/renderer/Renderer';
import BaseMap from '../../src/map/BaseMap';
import { getMapMock } from '../mock/map';

class TestRenderer extends Renderer {
  constructor(map: BaseMap) {
    super(map);
  }
}

describe('Renderer test', () => {
  it('has map', () => {
    expect(new TestRenderer(getMapMock())).toHaveProperty('map');
  });
});
