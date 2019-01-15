import Interaction from '../../src/interaction/Interaction';
import BaseMap from '../../src/map/BaseMap';
import { getMapMock } from '../mock/map';

describe('Interaction test', () => {
  it('test properties', () => {
    const map: BaseMap = getMapMock();
    const interaction: Interaction = new Interaction({
      map
    });

    expect(interaction).toHaveProperty('map');
  });
});
