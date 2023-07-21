import { Observable } from '../observable';
import { Subscription } from '../subscription';
import { Subscriber } from '../type';

/**
 * 将多个可观察对象合并为一个新的可观察对象，并在每个可观察对象发出新值时进行组合。
 * 可以传入一个可选的投射函数，对合并后的值进行转换。
 *
 * @param observables 要合并的可观察对象列表。
 * @returns 一个新的可观察对象，它发出合并后的值或转换后的值。
 */
export function combineLatest<T extends any[]>(
  ...observables: { [K in keyof T]: Observable<T[K]> }
): Observable<T>;
/**
 * 将多个可观察对象和一个投射函数合并为一个新的可观察对象，并在每个可观察对象发出新值时进行组合。
 * 投射函数用于对合并后的值进行转换。
 *
 * @param observables 要合并的可观察对象列表。
 * @param project 投射函数，用于转换合并后的值。
 * @returns 一个新的可观察对象，它发出转换后的值。
 */
export function combineLatest<T extends any[], R>(
  ...observables: [...{ [K in keyof T]: Observable<T[K]> }, (...values: T) => R]
): Observable<R>;
/**
 * 将多个可观察对象合并为一个新的可观察对象，并在每个可观察对象发出新值时进行组合。
 * 可以传入一个可选的投射函数，对合并后的值进行转换。
 *
 * @param observables 要合并的可观察对象列表。
 * @returns 一个新的可观察对象，它发出合并后的值或转换后的值。
 */
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
          try {
            result = project(...values);
          } catch (err) {
            subscriber.error(err);
            return;
          }
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
        error: (err) => {
          subscriber.error(err);
          subscriptions &&
            subscriptions.forEach((subscription) => subscription.unsubscribe());
        },
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
