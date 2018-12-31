import mapia from '../src/mapia';

describe('mapia test', () => {
  it('Check having a Map', () => {
    expect(mapia).toHaveProperty('Map');
  });
});
