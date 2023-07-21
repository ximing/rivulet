import { Observable, combineLatest } from '../../src';

describe('combineLatest', () => {
  it('should combine values from multiple observables', (done) => {
    const observable1 = new Observable((subscriber) => {
      subscriber.next(1);
      subscriber.complete();
    });

    const observable2 = new Observable((subscriber) => {
      subscriber.next('a');
      subscriber.complete();
    });

    const combinedObservable = combineLatest(observable1, observable2);

    combinedObservable.subscribe({
      next: (value) => {
        expect(value).toEqual([1, 'a']);
      },
      error: (err) => done.fail(err),
      complete: () => done(),
    });
  });

  it('should propagate errors', (done) => {
    const errorObservable = new Observable((subscriber) => {
      subscriber.error(new Error('test error'));
    });

    const combinedObservable = combineLatest(errorObservable);

    combinedObservable.subscribe({
      next: () => done.fail('should not emit values'),
      error: (err) => {
        expect(err).toEqual(new Error('test error'));
        done();
      },
      complete: () => done.fail('should not complete'),
    });
  });

  it('should stop emitting values after unsubscribe', (done) => {
    let nextCallCount = 0;
    const infiniteObservable = new Observable((subscriber) => {
      let value = 0;
      const intervalId = setInterval(() => {
        subscriber.next(value++);
      }, 50);
      return () => clearInterval(intervalId);
    });

    const combinedObservable = combineLatest(infiniteObservable);

    const subscription = combinedObservable.subscribe({
      next: () => {
        nextCallCount++;
        if (nextCallCount === 3) {
          subscription.unsubscribe();
          setTimeout(() => {
            expect(nextCallCount).toEqual(3);
            done();
          }, 100);
        }
      },
      error: (err) => done.fail(err),
    });
  });
});
