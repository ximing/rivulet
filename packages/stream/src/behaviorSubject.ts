import { Subject } from './subject';
import { Observer, Unsubscribable } from './type';
import { Subscription } from './subscription';

/**
 * 表示一个行为主题（Behavior Subject），是一种特殊的主题（Subject）。
 * 行为主题在订阅时会发送当前值给观察者，并在每次更新值时发送新值给观察者。
 *
 * @typeparam T 值的类型。
 */
export class BehaviorSubject<T> extends Subject<T> {
  private currentValue: T;

  /**
   * 获取当前的值。
   */
  get value(): T {
    return this.currentValue;
  }

  /**
   * 创建一个行为主题，并指定初始值。
   *
   * @param initialValue 初始值。
   */
  constructor(initialValue: T) {
    super();
    this.currentValue = initialValue;
  }

  /**
   * 发送下一个值给观察者，并更新当前值。
   *
   * @param value 要发送的值。
   */
  next(value: T) {
    if (this.closed) return;
    this.currentValue = value;
    super.next(value);
  }

  /**
   * 订阅行为主题，并立即发送当前值给观察者。
   *
   * @param observer 观察者对象。
   * @returns 可取消订阅的对象。
   */
  subscribe(observer: Observer<T>): Unsubscribable {
    try {
      observer.next(this.currentValue);
    } catch (err) {
      if (observer.error) {
        observer.error(err);
        return Subscription.EMPTY;
      }
      console.error('Error occurred while sending initial value:', err);
      return Subscription.EMPTY;
    }
    return super.subscribe(observer);
  }
}
