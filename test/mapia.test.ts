import mapia from '../src/mapia';

describe('mapia test', () => {
  it('Check having a CanvasMap', () => {
    expect(mapia).toHaveProperty('CanvasMap');
  });
});
