import { Subscriber } from '../src';

describe('Subscriber', () => {
  let subscriber: Subscriber<any>;
  let next: jest.Mock;
  let error: jest.Mock;
  let complete: jest.Mock;

  beforeEach(() => {
    next = jest.fn();
    error = jest.fn();
    complete = jest.fn();
    subscriber = new Subscriber({ next, error, complete });
  });

  test('should call next callback', () => {
    const value = 'test';
    subscriber.next(value);
    expect(next).toHaveBeenCalledWith(value);
  });

  test('should call error callback and unsubscribe', () => {
    const err = new Error('test error');
    subscriber.error(err);
    expect(error).toHaveBeenCalledWith(err);
    expect(subscriber.closed).toBe(true);
  });

  test('should call complete callback and unsubscribe', () => {
    subscriber.complete();
    expect(complete).toHaveBeenCalled();
    expect(subscriber.closed).toBe(true);
  });

  test('should not call any callbacks after unsubscription', () => {
    subscriber.unsubscribe();
    subscriber.next('value');
    subscriber.error(new Error('error'));
    subscriber.complete();

    expect(next).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    expect(complete).not.toHaveBeenCalled();
  });

  test('should be able to add and remove teardown logic', () => {
    const teardown = jest.fn();
    const subscription = { unsubscribe: teardown };

    subscriber.add(subscription);
    subscriber.unsubscribe();

    expect(teardown).toHaveBeenCalled();
    teardown.mockClear();

    subscriber.add(subscription);
    subscriber.remove(subscription);
    subscriber.unsubscribe();

    expect(teardown).not.toHaveBeenCalled();
  });
});
