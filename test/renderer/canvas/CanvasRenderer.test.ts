import Map from '../../../src/map/Map';
import CanvasRenderer from '../../../src/renderer/canvas/CanvasRenderer';
import { getMapMock } from '../../mock/map';

describe('CanvasRenderer test', () => {
  it('test valid canvas', () => {
    const map: Map = getMapMock();
    const target: HTMLElement = map.element;
    const renderer: CanvasRenderer = new CanvasRenderer(map);
    const canvas: HTMLCanvasElement = renderer.canvas;

    if (!canvas) {
      throw new Error('Invalid canvas');
    }

    expect(canvas.width).toBe(target.clientWidth);
    expect(canvas.height).toBe(target.clientHeight);
  });
});
