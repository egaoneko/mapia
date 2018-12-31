import Renderer from '../../src/renderer/Renderer';
import Map from '../../src/map/Map';
import { getMapMock } from '../mock/map';

class TestRenderer extends Renderer {
  constructor(map: Map) {
    super(map);
  }
}

describe('Renderer test', () => {
  it('instanceof EventTarget', () => {
    expect(new TestRenderer(getMapMock())).toHaveProperty('map');
  });
});
