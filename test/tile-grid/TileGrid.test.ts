import TileGrid from '../../src/tile-grid/TileGrid';

describe('TileGrid test', () => {
  it('test properties', () => {
    const tileGrid: TileGrid = new TileGrid();

    expect(tileGrid).toHaveProperty('origin');
    expect(tileGrid).toHaveProperty('extent');
    expect(tileGrid).toHaveProperty('tileSize');
    expect(tileGrid).toHaveProperty('minZoom');
  });

  it('test origin properties', () => {
    let tileGrid: TileGrid = new TileGrid();
    expect(tileGrid['origin']).toEqual([0, 0]);

    tileGrid = new TileGrid({ origin: [10, 10] });
    expect(tileGrid['origin']).toEqual([10, 10]);
  });

  it('test extent properties', () => {
    let tileGrid: TileGrid = new TileGrid();
    expect(tileGrid['extent']).toEqual([0, 0, 256, 256]);

    tileGrid = new TileGrid({ extent: [10, 10, 20, 20] });
    expect(tileGrid['extent']).toEqual([10, 10, 20, 20]);
  });

  it('test tileSize properties', () => {
    let tileGrid: TileGrid = new TileGrid();
    expect(tileGrid['tileSize']).toEqual([256, 256]);

    tileGrid = new TileGrid({ tileSize: [10, 10] });
    expect(tileGrid['tileSize']).toEqual([10, 10]);
  });

  it('test minZoom properties', () => {
    let tileGrid: TileGrid = new TileGrid();
    expect(tileGrid['minZoom']).toEqual(0);

    tileGrid = new TileGrid({ minZoom: 10 });
    expect(tileGrid['minZoom']).toEqual(10);
  });
});
