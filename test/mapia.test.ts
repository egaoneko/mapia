import mapia from '../src/mapia';

describe('mapia test', () => {
  it('Check having a BaseMap', () => {
    expect(mapia).toHaveProperty('Map');
  });
});
