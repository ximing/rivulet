import { EventEmitter } from '../src';

describe('EventEmitter', () => {
  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  afterEach(() => {
    emitter.removeAllListeners();
  });

  test('should add a listener for a given event', () => {
    const fn = jest.fn();
    emitter.on('event', fn);
    expect(emitter.listeners('event')).toEqual([fn]);
  });

  test('should add a one-time listener for a given event', () => {
    const fn = jest.fn();
    emitter.once('event', fn);
    expect(emitter.listeners('event')).toEqual([fn]);

    emitter.emit('event');
    expect(emitter.listeners('event')).toEqual([]);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should remove a listener for a given event', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const fn3 = jest.fn();

    emitter.on('event', fn1);
    emitter.on('event', fn2);
    emitter.on('event', fn3);

    expect(emitter.listeners('event')).toEqual([fn1, fn2, fn3]);

    emitter.removeListener('event', fn2);

    expect(emitter.listeners('event')).toEqual([fn1, fn3]);
  });

  test('should remove all listeners for a given event', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    emitter.on('event1', fn1);
    emitter.on('event2', fn2);

    expect(emitter.listeners('event1')).toEqual([fn1]);
    expect(emitter.listeners('event2')).toEqual([fn2]);

    emitter.removeAllListeners('event1');

    expect(emitter.listeners('event1')).toEqual([]);
    expect(emitter.listeners('event2')).toEqual([fn2]);
  });

  test('should remove all listeners', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    emitter.on('event1', fn1);
    emitter.on('event2', fn2);

    expect(emitter.listeners('event1')).toEqual([fn1]);
    expect(emitter.listeners('event2')).toEqual([fn2]);

    emitter.removeAllListeners();

    expect(emitter.listeners('event1')).toEqual([]);
    expect(emitter.listeners('event2')).toEqual([]);
  });

  test('should emit an event and call the listeners', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    emitter.on('event', fn1);
    emitter.on('event', fn2);

    expect(emitter.emit('event')).toBe(true);
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
  });

  test('should emit an event with arguments and call the listeners with the arguments', () => {
    const fn = jest.fn();
    const arg1 = 'arg1';
    const arg2 = { foo: 'bar' };

    emitter.on('event', fn);

    expect(emitter.emit('event', arg1, arg2)).toBe(true);
    expect(fn).toHaveBeenCalledWith(arg1, arg2);
  });

  test('should return false if no listeners are registered for the event', () => {
    expect(emitter.emit('event')).toBe(false);
  });

  test('should return the event names', () => {
    emitter.on('event1', jest.fn());
    emitter.on('event2', jest.fn());
    emitter.on(Symbol('event3'), jest.fn());

    const eventNames = emitter.eventNames();
    expect(eventNames).toContain('event1');
    expect(eventNames).toContain('event2');
  });

  test('should return the listeners for a given event', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    const fn3 = jest.fn();

    emitter.on('event', fn1);
    emitter.on('event', fn2);
    emitter.on('otherEvent', fn3);

    const listeners = emitter.listeners('event');
    expect(listeners).toEqual([fn1, fn2]);
  });

  test('should return the number of listeners for a given event', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    emitter.on('event', fn1);
    emitter.on('event', fn2);

    expect(emitter.listenerCount('event')).toBe(2);
  });

  test('should return an unsubscribe function when adding a listener', () => {
    const fn = jest.fn();
    const unSub = emitter.on('LOGIN_SUCCESS', fn);

    expect(typeof unSub).toBe('function');

    unSub(); // Unsubscribe the listener
    emitter.emit('LOGIN_SUCCESS');
    expect(fn).not.toHaveBeenCalled();
  });

  test('should throw an error when `fn` is not passed to removeListener', () => {
    expect(() => {
      const fn = jest.fn();
      emitter.on('event', fn);
      emitter.off('event');
    }).toThrow('removeListener fn must be function');
  });
});
