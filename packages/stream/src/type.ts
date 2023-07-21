/**
 * 表示可取消订阅的接口。
 */
export interface Unsubscribable {
  /**
   * 取消订阅。
   */
  unsubscribe(): void;
}

/**
 * 表示观察者的接口。
 */
export interface Observer<T> {
  /**
   * 处理下一个值。
   *
   * @param value 下一个值。
   */
  next: (value: T) => void;
  /**
   * 处理错误。
   *
   * @param err 错误。
   */
  error: (err: any) => void;
  /**
   * 完成订阅。
   */
  complete: () => void;
}

/**
 * 表示清理逻辑的类型。
 */
export type TeardownLogic = Subscription | Unsubscribable | (() => void) | void;

/**
 * 表示订阅的接口，继承自 Unsubscribable。
 */
export interface Subscription extends Unsubscribable {
  /**
   * 订阅是否已关闭。
   */
  closed: boolean;

  /**
   * 添加清理逻辑。
   *
   * @param teardown 清理逻辑。
   */
  add(teardown: TeardownLogic): void;

  /**
   * 移除清理逻辑。
   *
   * @param teardown 清理逻辑。
   */
  remove(teardown: TeardownLogic): void;
}

/**
 * 表示订阅者的接口，继承自 Observer 和 Subscription。
 */
export interface Subscriber<T> extends Observer<T> {
  closed: boolean;
}

/**
 * 表示操作符的接口。
 */
export interface Operator<T, R> {
  /**
   * 调用操作符，对订阅者和源进行操作，并返回清理逻辑。
   *
   * @param subscriber 订阅者。
   * @param source 源。
   * @returns 清理逻辑。
   */
  call(subscriber: Subscriber<R>, source: any): TeardownLogic;
}

interface Observable<T> {
  /**
   * 订阅可观察对象。
   *
   * @param observer 观察者。
   * @returns 订阅对象。
   */
  subscribe(observer: Observer<T>): Subscription;
}

/**
 * 表示操作符函数的类型。
 */
export interface OperatorFunction<T, R> {
  /**
   * 对可观察对象应用操作符。
   *
   * @param source 可观察对象。
   * @returns 应用操作符后的可观察对象。
   */
  (source: Observable<T>): Observable<R>;
}

/**
 * 表示可订阅对象的接口。
 */
export interface Subscribable<T> {
  /**
   * 订阅可观察对象。
   *
   * @param observer 部分观察者。
   * @returns 取消订阅对象。
   */
  subscribe(observer: Partial<Observer<T>>): Unsubscribable;
}
