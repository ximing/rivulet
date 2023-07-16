import { Observable } from '../observable';
import { Subscription } from '../subscription';
import { Subscriber } from '../type';

export function combineLatest<T extends any[]>(
  ...observables: { [K in keyof T]: Observable<T[K]> }
): Observable<T>;
export function combineLatest<T extends any[], R>(
  ...observables: [...{ [K in keyof T]: Observable<T[K]> }, (...values: T) => R]
): Observable<R>;
export function combineLatest(...observables: any[]): Observable<any> {
  // eslint-disable-next-line @typescript-eslint/ban-types
  let project: Function | undefined;
  if (typeof observables[observables.length - 1] === 'function') {
    project = observables.pop();
  }

  return new Observable<any>((subscriber: Subscriber<any>) => {
    const values = new Array(observables.length).fill(null);
    const hasValue = new Array(observables.length).fill(false);
    let activeObservables = observables.length;

    const checkValuesAndEmit = () => {
      if (hasValue.every(Boolean)) {
        let result = values;
        if (project) {
          result = project(...values);
        }
        subscriber.next(result);
      }
    };

    const subscriptions = observables.map((observable, i) => {
      return observable.subscribe({
        next: (value: any) => {
          values[i] = value;
          hasValue[i] = true;
          checkValuesAndEmit();
        },
        error: (err) => subscriber.error(err),
        complete: () => {
          if (--activeObservables === 0) {
            subscriber.complete();
          }
        },
      });
    });

    return new Subscription(() => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    });
  });
}
