import BaseMap from '../../src/map/BaseMap';
import { Option } from '../../src/interface/Map';

describe('BaseMap test', () => {
  const OPTION: Option = {};

  it('test properties', () => {
    const option: Option = {
      ...OPTION,
      target: document.createElement('div')
    };
    const map = new BaseMap(option);
    expect(map).toHaveProperty('element');
    expect(map).toHaveProperty('renderer');
    expect(map).toHaveProperty('view');
    expect(map).toHaveProperty('option');
    expect(map).toHaveProperty('interaction');
    expect(map).toHaveProperty('browserEventHandler');
  });

  it('throw exception with an empty target', () => {
    const option: Option = {
      ...OPTION,
      target: undefined
    };
    expect(() => new BaseMap(option)).toThrowError('Can not found target.');
  });

  it('create with string target', () => {
    const map: HTMLDivElement = document.createElement('div');
    map.id = 'map';
    document.body.appendChild(map);

    const option: Option = {
      ...OPTION,
      target: 'map'
    };
    expect(new BaseMap(option).element).toBe(map);
  });

  it('throw exception with invalid string target', () => {
    const map: HTMLDivElement = document.createElement('div');
    map.id = 'map';
    document.body.appendChild(map);

    const option: Option = {
      ...OPTION,
      target: 'map_invalid'
    };
    expect(() => new BaseMap(option)).toThrowError('Invalid target.');
  });

  it('create with object target', () => {
    const map: HTMLDivElement = document.createElement('div');
    const option: Option = {
      ...OPTION,
      target: map
    };
    expect(new BaseMap(option).element).toBe(map);
  });

  it('throw exception with invalid object target', () => {
    const option: Option = {
      ...OPTION,
      target: {} as HTMLElement
    };
    expect(() => new BaseMap(option)).toThrowError('Invalid target.');
  });
});
