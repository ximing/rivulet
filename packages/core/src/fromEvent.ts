import { Observable } from './observable';

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
