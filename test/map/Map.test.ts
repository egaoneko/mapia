import BaseMap from '../../src/map/Map';
import { Option } from '../../src/interface/Map';

class Map extends BaseMap {
  public resize(): void {
    return;
  }
}

describe('Map test', () => {
  const OPTION: Option = {};

  it('throw exeption with an empty target', () => {
    const option: Option = {
      ...OPTION,
      target: undefined
    };
    expect(() => new Map(option)).toThrowError('Can not found target.');
  });

  it('create with string target', () => {
    const map: HTMLDivElement = document.createElement('div');
    map.id = 'map';
    document.body.appendChild(map);

    const option: Option = {
      ...OPTION,
      target: 'map'
    };
    expect(new Map(option).element).toBe(map);
  });

  it('throw exeption with invalid string target', () => {
    const map: HTMLDivElement = document.createElement('div');
    map.id = 'map';
    document.body.appendChild(map);

    const option: Option = {
      ...OPTION,
      target: 'map_invalid'
    };
    expect(() => new Map(option)).toThrowError('Invalid target.');
  });

  it('create with object target', () => {
    const map: HTMLDivElement = document.createElement('div');
    const option: Option = {
      ...OPTION,
      target: map
    };
    expect(new Map(option).element).toBe(map);
  });

  it('throw exeption with invalid object target', () => {
    const option: Option = {
      ...OPTION,
      target: {} as HTMLElement
    };
    expect(() => new Map(option)).toThrowError('Invalid target.');
  });
});
