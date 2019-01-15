import CoordinateSystem from '../src/CoordinateSystem';

describe('CoordinateSystem test', () => {
  it('test properties', () => {
    const coordinateSystem: CoordinateSystem = new CoordinateSystem();

    expect(coordinateSystem).toHaveProperty('origin');
    expect(coordinateSystem).toHaveProperty('center');
    expect(coordinateSystem).toHaveProperty('extent');
  });

  it('test origin properties', () => {
    let coordinateSystem: CoordinateSystem = new CoordinateSystem();
    expect(coordinateSystem['origin']).toEqual([0, 0]);

    coordinateSystem = new CoordinateSystem({ origin: [10, 10] });
    expect(coordinateSystem['origin']).toEqual([10, 10]);
  });

  it('test center properties', () => {
    let coordinateSystem: CoordinateSystem = new CoordinateSystem();
    expect(coordinateSystem['center']).toEqual({ x: 0, y: 0 });

    coordinateSystem = new CoordinateSystem({ center: [10, 10] });
    expect(coordinateSystem['center']).toEqual({ x: 10, y: 10 });
  });

  it('test extent properties', () => {
    let coordinateSystem: CoordinateSystem = new CoordinateSystem();
    expect(coordinateSystem['extent']).toEqual([0, 0, 256, 256]);

    coordinateSystem = new CoordinateSystem({ extent: [10, 10, 20, 20] });
    expect(coordinateSystem['extent']).toEqual([10, 10, 20, 20]);
  });
});
