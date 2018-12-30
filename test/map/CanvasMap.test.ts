import CanvasMap from '../../src/map/CanvasMap';
import { Option } from '../../src/interface/Map';

describe('Map test', () => {
  const OPTION: Option = {};

  it('test valid canvas', () => {
    const target: HTMLDivElement = document.createElement('div');
    const option: Option = {
      ...OPTION,
      target
    };

    const map: CanvasMap = new CanvasMap(option);
    const canvas: HTMLCanvasElement | undefined = map.canvas;

    if (!canvas) {
      throw new Error('Invalid canvas');
    }

    expect(canvas.width).toBe(target.clientWidth);
    expect(canvas.height).toBe(target.clientHeight);
  });
});
