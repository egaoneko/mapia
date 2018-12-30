import Base from '../src/Base';
import EventTarget from '../src/util/EventTarget';

describe('Base test', () => {
  it('instanceof EventTarget', () => {
    expect(new Base()).toBeInstanceOf(EventTarget);
  });
});
