import { Option } from '../../src/interface/map';
import Map from '../../src/map/Map';

export function getMapMock(): Map {
  const map: HTMLDivElement = document.createElement('div');
  const option: Option = {
    target: map
  };
  return new Map(option);
}
