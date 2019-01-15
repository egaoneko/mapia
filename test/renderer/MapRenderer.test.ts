import BaseMap from '../../src/map/BaseMap';
import { getMapMock } from '../mock/map';
import MapRenderer from '../../src/renderer/MapRenderer';

describe('MapRenderer test', () => {
  it('test properties', () => {
    const map: BaseMap = getMapMock();
    const renderer: MapRenderer = new MapRenderer(map);

    expect(renderer).toHaveProperty('tileGrid');
    expect(renderer).toHaveProperty('renderer');
    expect(renderer).toHaveProperty('canvas');
  });

  it('test valid canvas', () => {
    const map: BaseMap = getMapMock();
    const renderer: MapRenderer = new MapRenderer(map);
    const canvas: HTMLCanvasElement = renderer.canvas;

    if (!canvas) {
      throw new Error('Invalid canvas');
    }

    expect(canvas.style.cssText).toBe('width: 100%; height: 100%; display: block;');
  });
});
