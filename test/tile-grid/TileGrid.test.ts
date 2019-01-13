import TileGrid from '../../src/tile-grid/TileGrid';

describe('TileGrid test', () => {
  it('test properties', () => {
    const tileGrid: TileGrid = new TileGrid();

    expect(tileGrid).toHaveProperty('origin');
  });

  it('test origin properties', () => {
    let tileGrid: TileGrid = new TileGrid();
    expect(tileGrid['origin']).toEqual([0, 0]);

    tileGrid = new TileGrid({ origin: [10, 10] });
    expect(tileGrid['origin']).toEqual([10, 10]);
  });
});
