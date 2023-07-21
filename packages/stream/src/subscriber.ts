import { Observer } from './type';

/**
 * 表示一个实现了 Observer 接口和 Subscription 接口的订阅者。
 */
export class Subscriber<T> implements Subscriber<T> {
  /**
   * 表示订阅是否已关闭。
   */
  closed = false;
  /**
   * 创建一个新的订阅者实例。
   *
   * @param observer 用于处理通知的观察者对象。
   */
  constructor(private observer: Observer<T>) {}

  /**
   * 一个已关闭的空订阅。
   */
  next(value: T) {
    if (!this.closed && this.observer.next) {
      this.observer.next(value);
    }
  }

  /**
   * 处理错误。
   *
   * @param err 发生的错误。
   */
  error(err: any) {
    if (!this.closed && this.observer.error) {
      this.observer.error(err);
      this.closed = true;
    }
  }

  /**
   * 完成订阅。
   */
  complete() {
    if (!this.closed && this.observer.complete) {
      this.observer.complete();
      this.closed = true;
    }
  }
}
