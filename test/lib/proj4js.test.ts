import * as proj4 from 'proj4';

describe('proj4 test', () => {
  it('get defined projection', () => {
    console.dir(proj4('EPSG:3857'));
    console.dir(proj4('EPSG:4326'));
  });
});
