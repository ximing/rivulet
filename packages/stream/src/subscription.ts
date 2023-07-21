import { TeardownLogic } from './type';

/**
 * 表示对事件流或值流的订阅。
 */
export class Subscription {
  /**
   * 表示订阅是否已关闭。
   */
  closed = false;

  /**
   * 用于存储清理逻辑函数的数组。
   */
  private teardowns: TeardownLogic[] = [];

  /**
   * 一个已关闭的空订阅。
   */
  static EMPTY: Subscription = (() => {
    const empty = new Subscription();
    empty.closed = true;
    return empty;
  })();

  /**
   * 创建一个新的订阅，可选地指定初始清理逻辑。
   *
   * @param initialTeardown 在取消订阅时要执行的初始清理逻辑。
   */
  constructor(private initialTeardown?: TeardownLogic) {}

  /**
   * 取消订阅，执行清理逻辑。
   */
  unsubscribe(): void {
    if (this.closed) {
      return;
    }
    this.closed = true;
    if (this.initialTeardown) {
      this.executeTeardown(this.initialTeardown);
    }
    for (const teardown of this.teardowns) {
      this.executeTeardown(teardown);
    }
    this.teardowns = [];
  }

  /**
   * 将清理逻辑函数添加到订阅中。
   *
   * @param teardown 要添加的清理逻辑函数。
   */
  add(teardown: TeardownLogic): void {
    if (!teardown || teardown === this) {
      return;
    }
    if (this.closed) {
      this.executeTeardown(teardown);
    } else {
      this.teardowns.push(teardown);
    }
  }

  /**
   * 从订阅中移除清理逻辑函数。
   *
   * @param teardown 要移除的清理逻辑函数。
   */
  remove(teardown: TeardownLogic): void {
    const index = this.teardowns.indexOf(teardown);
    if (index !== -1) {
      this.teardowns.splice(index, 1);
    }
  }

  /**
   * 执行给定的清理逻辑。
   *
   * @param teardown 要执行的清理逻辑函数。
   * @private
   */
  private executeTeardown(teardown: TeardownLogic): void {
    if (typeof teardown === 'function') {
      teardown();
    } else if (teardown && typeof teardown.unsubscribe === 'function') {
      teardown.unsubscribe();
    }
  }
}
