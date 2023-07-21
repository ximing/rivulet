import { Subscriber } from './subscriber';
import { Subscription } from './subscription';
import { Observer, Operator, Subscribable, TeardownLogic } from './type';
import { observable } from './contants';

/**
 * 表示一个可观察对象，用于发送值给观察者。
 *
 * @typeparam T 可观察对象发送的值的类型。
 */
export class Observable<T> implements Subscribable<T> {
  source: Observable<any> | undefined;
  operator: Operator<any, T> | undefined;

  /**
   * 创建一个新的可观察对象。
   *
   * @param subscribeFn 订阅函数，用于定义订阅行为。
   */
  constructor(
    private subscribeFn?: (
      this: Observable<T>,
      subscriber: Subscriber<T>
    ) => TeardownLogic
  ) {}

  /**
   * 订阅可观察对象，传入观察者或回调函数来处理接收到的值、错误和完成信号。
   *
   * @param observerOrNext 观察者对象或处理下一个值的回调函数。
   * @param error 处理错误的回调函数。
   * @param complete 处理完成信号的回调函数。
   * @returns 订阅对象，用于取消订阅。
   */
  subscribe(
    observerOrNext?: Partial<Observer<T>> | ((value: T) => void),
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription {
    let observer: Partial<Observer<T>>;
    if (typeof observerOrNext === 'function') {
      observer = {
        next: observerOrNext,
        error,
        complete,
      };
    } else {
      observer = observerOrNext || {};
    }
    const subscriber = new Subscriber(observer as Observer<T>);
    try {
      const unsubscribe = this.subscribeFn?.call(this, subscriber);
      const subscription = new Subscription(unsubscribe);
      subscription.add(() => {
        subscriber.closed = true;
      });
      return subscription;
    } catch (err) {
      try {
        if (subscriber.error) {
          subscriber.error(err);
        }
      } catch (innerErr) {
        console.error(`${observable} error callback`, innerErr);
      }
      console.error(`${observable} subscription error`, err);
      return Subscription.EMPTY;
    }
  }

  // lift<R>(operator: Operator<T, R>): Observable<R> {
  //     const observable = new Observable<R>();
  //     observable.source = this;
  //     observable.operator = operator;
  //     return observable;
  // }

  // forEach(next: (value: T) => void, promiseCtor?: PromiseConstructorLike): Promise<void> {
  //     return new Promise<void>((resolve, reject) => {
  //         this.subscribe({
  //             next,
  //             error: reject,
  //             complete: resolve
  //         });
  //     });
  // }

  // pipe(...operations: OperatorFunction<any, any>[]): Observable<any> {
  //     return operations.reduce((prev, fn) => fn(prev), this);
  // }
}
