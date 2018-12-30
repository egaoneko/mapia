import EventTarget from '../../src/util/EventTarget';

describe('EventTarget test', () => {
  let eventTarget: any;
  beforeEach(() => {
    eventTarget = new EventTarget();
  });

  it('test addEventListener', () => {
    const mockCallback = jest.fn(x => x);
    eventTarget.addEventListener('test', mockCallback);
    
    const listeners: any = eventTarget.listeners;
    expect(listeners['test'].length).toBe(1);
    expect(listeners['test'][0]).toBe(mockCallback);
  });

  it('test removeEventListener', () => {
    const mockCallback = jest.fn(x => x);
    eventTarget.addEventListener('test', mockCallback);
    
    const listeners: any = eventTarget.listeners;
    expect(listeners['test'].length).toBe(1);

    eventTarget.removeEventListener('test', mockCallback);
    expect(listeners['test'].length).toBe(0);
  });

  it('test dispatchEvent', () => {
    const mockCallback = jest.fn(x => x);
    eventTarget.addEventListener('test', mockCallback);
    
    const listeners: any = eventTarget.listeners;
    expect(listeners['test'].length).toBe(1);

    eventTarget.dispatchEvent({type: 'test'});
    eventTarget.dispatchEvent({type: 'test'});
    expect(mockCallback.mock.calls.length).toBe(2);
    expect(mockCallback.mock.results[0].value.type).toBe('test');
    expect(mockCallback.mock.results[0].value.target).toBe(eventTarget);
  });
});
