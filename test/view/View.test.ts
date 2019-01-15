import View from '../../src/view/View';

describe('View test', () => {
  it('test properties', () => {
    const view: View = new View();

    expect(view).toHaveProperty('center');
    expect(view).toHaveProperty('zoom');
    expect(view).toHaveProperty('extent');
    expect(view).toHaveProperty('minZoom');
    expect(view).toHaveProperty('maxZoom');
  });

  it('test center properties', () => {
    let view: View = new View();
    expect(view['center']).toEqual([0, 0]);

    view = new View({ center: [10, 10] });
    expect(view['center']).toEqual([10, 10]);
  });

  it('test extent properties', () => {
    let view: View = new View();
    expect(view['extent']).toEqual([0, 0, 0, 0]);

    view = new View({ extent: [10, 10, 20, 20] });
    expect(view['extent']).toEqual([10, 10, 20, 20]);
  });

  it('test zoom properties', () => {
    let view: View = new View();
    expect(view['zoom']).toEqual(1);

    view = new View({ zoom: 10 });
    expect(view['zoom']).toEqual(10);
  });

  it('test minZoom properties', () => {
    let view: View = new View();
    expect(view['minZoom']).toEqual(0);

    view = new View({ minZoom: 10 });
    expect(view['minZoom']).toEqual(10);
  });

  it('test maxZoom properties', () => {
    let view: View = new View();
    expect(view['maxZoom']).toEqual(28);

    view = new View({ maxZoom: 10 });
    expect(view['maxZoom']).toEqual(10);
  });
});
