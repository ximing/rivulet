import { Subscriber, Observer } from '../src';
import { observable } from '../src/contants';
describe('Subscriber', () => {
  let observer: Observer<any>;
  let subscriber: Subscriber<any>;

  beforeEach(() => {
    observer = {
      next: jest.fn(),
      error: jest.fn(),
      complete: jest.fn(),
    };
    subscriber = new Subscriber(observer);
  });

  it('should call next on observer when next is called on subscriber', () => {
    const testData = 'test data';
    subscriber.next(testData);
    expect(observer.next).toHaveBeenCalledWith(testData);
  });

  it('should not break if next is undefined on observer', () => {
    observer.next = undefined;
    expect(() => subscriber.next('test data')).not.toThrow();
  });

  it('should call error on observer when error is called on subscriber', () => {
    const testError = new Error('test error');
    subscriber.error(testError);
    expect(observer.error).toHaveBeenCalledWith(testError);
  });

  it('should not break if error is undefined on observer', () => {
    observer.error = undefined;
    expect(() => subscriber.error(new Error('test error'))).not.toThrow();
  });

  it('should call complete on observer when complete is called on subscriber', () => {
    subscriber.complete();
    expect(observer.complete).toHaveBeenCalled();
  });

  it('should not break if complete is undefined on observer', () => {
    observer.complete = undefined;
    expect(() => subscriber.complete()).not.toThrow();
  });
});
