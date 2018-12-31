import { createCanvasContext2D } from '../../src/util/dom';

describe('dom test', () => {
  it('test createCanvasContext2D', () => {
    const ctx: CanvasRenderingContext2D | null = createCanvasContext2D(100, 200);

    if (!ctx) {
      throw new Error('Can not get context from canvas.');
    }

    expect(ctx).toBeInstanceOf(CanvasRenderingContext2D);
    expect(ctx.canvas.width).toBe(100);
    expect(ctx.canvas.height).toBe(200);
  });
});
