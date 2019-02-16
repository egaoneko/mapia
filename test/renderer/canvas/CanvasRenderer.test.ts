import BaseMap from '../../../src/map/BaseMap';
import CanvasRenderer from '../../../src/renderer/canvas/CanvasRenderer';
import { getMapMock } from '../../mock/map';

describe('CanvasRenderer test', () => {
  it('test valid canvas', () => {
    const renderer: CanvasRenderer = new CanvasRenderer();
    expect(renderer.canvas).toBeInstanceOf(HTMLCanvasElement);
  });
});
