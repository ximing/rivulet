import { Observable } from './observable';

/**
 * 创建一个可观察对象，从指定的事件源和事件名称中获取事件数据。
 *
 * @typeparam T 事件数据的类型。
 * @param target 事件源对象，可以是 DOM 元素、EventTarget 或其他支持事件监听的对象。
 * @param eventName 事件名称。
 * @returns 表示事件数据的可观察对象。
 */
export function fromEvent<T>(target: any, eventName: string): Observable<T> {
  return new Observable<T>((subscriber) => {
    const handler = (event: T) => {
      subscriber.next(event);
    };

    // 添加事件监听器
    target.addEventListener(eventName, handler);

    // 返回一个执行取消订阅的函数
    return () => {
      // 在取消订阅时移除事件监听器
      target.removeEventListener(eventName, handler);
    };
  });
}
