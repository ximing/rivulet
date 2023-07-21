import { Observer, Unsubscribable } from './type';

/**
 * 是一种特殊的 Observable（可观察对象），同时也实现了 Observer（观察者）接口。
 * Subject 可以被用来作为事件流的源头，以及多个观察者订阅该事件流。
 * 它能够同时充当事件源和观察者，支持多播和共享数据，以及提供订阅和取消订阅的机制
 */
export class Subject<T> implements Observer<T> {
  /**
   * 存储观察者的数组。
   */
  private observers: Observer<T>[] = [];

  closed = false;

  /**
   * 发送下一个值给所有观察者。
   *
   * @param value 要发送的值。
   */
  next(value: T) {
    if (this.closed) return; // 检查是否已关闭
    this.observers.forEach((observer) => {
      try {
        observer.next && observer.next(value);
      } catch (err) {
        console.error('subject observer next error:', err);
      }
    });
  }

  /**
   * 发送错误给所有观察者。
   *
   * @param err 发生的错误。
   */
  error(err: any) {
    if (this.closed) return;
    this.closed = true;
    this.observers.forEach((observer) => {
      try {
        observer.error && observer.error(err);
      } catch (e) {
        console.error('subject error', e);
      }
    });
    this.observers = [];
  }

  /**
   * 发送完成信号给所有观察者。
   */
  complete() {
    if (this.closed) return;
    this.closed = true;
    this.observers.forEach(
      (observer) => observer.complete && observer.complete()
    );
    this.observers = [];
  }

  /**
   * 订阅该 Subject。
   *
   * @param observer 观察者对象。
   * @returns 可取消订阅的对象。
   */
  subscribe(observer: Observer<T>): Unsubscribable {
    this.observers.push(observer);
    return {
      unsubscribe: () => {
        this.observers = this.observers.filter((obs) => obs !== observer);
      },
    };
  }
}
