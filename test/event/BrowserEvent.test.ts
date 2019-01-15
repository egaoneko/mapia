import BaseMap from '../../src/map/BaseMap';
import { getMapMock } from '../mock/map';
import BrowserEventHandler from '../../src/event/BrowserEventHandler';

describe('BrowserEventHandler test', () => {
  it('test properties', () => {
    const map: BaseMap = getMapMock();
    const event: BrowserEventHandler = new BrowserEventHandler({
      map
    });

    expect(event).toHaveProperty('map');
  });
});
