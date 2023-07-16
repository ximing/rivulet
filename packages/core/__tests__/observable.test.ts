import { Observable, Subscriber } from '../src';

describe('Observable', () => {
  it('should create an instance', () => {
    expect(new Observable()).toBeDefined();
  });

  it('should call next method of observer', (done) => {
    const next = jest.fn();
    const observable = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
    });

    observable.subscribe({
      next: (value) => {
        next(value);
        if (value === 3) {
          expect(next).toHaveBeenCalledTimes(3);
          expect(next).toHaveBeenNthCalledWith(1, 1);
          expect(next).toHaveBeenNthCalledWith(2, 2);
          expect(next).toHaveBeenNthCalledWith(3, 3);
          done();
        }
      },
    });
  });

  it('should handle error', () => {
    const error = jest.fn();
    const observable = new Observable<number>((subscriber) => {
      try {
        throw new Error('Test error');
      } catch (e) {
        subscriber.error(e);
      }
    });

    observable.subscribe({
      error: (err) => {
        error(err);
        expect(error).toHaveBeenCalledTimes(1);
        expect(error).toHaveBeenCalledWith(new Error('Test error'));
      },
    });
  });

  it('should call complete method of observer', (done) => {
    const complete = jest.fn();
    const observable = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();
    });

    observable.subscribe({
      next: () => {},
      complete: () => {
        complete();
        expect(complete).toHaveBeenCalledTimes(1);
        done();
      },
    });
  });

  it('should stop calling next after unsubscribe', (done) => {
    const next = jest.fn();
    const observable = new Observable<number>((subscriber) => {
      let i = 1;
      const interval = setInterval(() => {
        subscriber.next(i++);
      }, 10);
      return () => clearInterval(interval);
    });

    const subscription = observable.subscribe({
      next: (value) => {
        next(value);
        if (value === 3) {
          subscription.unsubscribe();
        }
      },
    });

    setTimeout(() => {
      expect(next).toHaveBeenCalledTimes(3);
      done();
    }, 50);
  });
});

describe('Subscriber', () => {
  let subscriber: Subscriber<number>;

  beforeEach(() => {
    subscriber = new Subscriber({
      next: () => {},
      error: () => {},
      complete: () => {},
    });
  });

  it('should be created', () => {
    expect(subscriber).toBeDefined();
  });

  it('should call observer methods', () => {
    const next = jest.fn();
    const error = jest.fn();
    const complete = jest.fn();

    const subscriber = new Subscriber<number>({
      next,
      error,
      complete,
    });

    subscriber.next(1);
    expect(next).toHaveBeenCalledWith(1);

    const err = new Error('Test error');
    subscriber.error(err);
    expect(error).toHaveBeenCalledWith(err);

    subscriber.complete();
    expect(complete).toHaveBeenCalledTimes(0);
  });

  it('should handle unsubscription', () => {
    const teardown = jest.fn();

    const subscriber = new Subscriber<number>({
      next: () => {},
      error: () => {},
      complete: () => {},
    });

    subscriber.add(teardown);
    subscriber.unsubscribe();

    expect(teardown).toHaveBeenCalledTimes(0);
    expect(subscriber.closed).toBe(true);
  });

  it('should not call observer methods after unsubscription', () => {
    const next = jest.fn();
    const error = jest.fn();
    const complete = jest.fn();

    const subscriber = new Subscriber<number>({
      next,
      error,
      complete,
    });

    subscriber.unsubscribe();

    subscriber.next(1);
    subscriber.error(new Error('Test error'));
    subscriber.complete();

    expect(next).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
    expect(complete).not.toHaveBeenCalled();
  });
});
