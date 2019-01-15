import { Option } from '../../src/interface/map';
import BaseMap from '../../src/map/BaseMap';

export function getMapMock(): BaseMap {
  const map: HTMLDivElement = document.createElement('div');
  const option: Option = {
    target: map
  };
  return new BaseMap(option);
}
