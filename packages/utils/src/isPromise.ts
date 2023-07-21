import { isFunction } from './isFunction';
import { isObject } from './isObject';

/**
 * 检查 `val` 是否为 Promise。在 JavaScript 中，Promise 被认为是具有 `then` 和 `catch` 方法的对象。
 * 此函数检查输入的 `val` 是否为对象，并且是否具有 `then` 和 `catch` 方法，这两个方法是 Promise 的典型属性。
 *
 * @since 1.0.0
 * @category Lang
 * @param {unknown} val 要检查的值。
 * @returns {boolean} 如果 `val` 是 Promise，则返回 `true`，否则返回 `false`。
 * @template T Promise 结果的预期类型。此参数是可选的，可以是任何类型。
 * @example
 *
 * isPromise(new Promise((resolve, reject) => {}))
 * // => true
 *
 * isPromise({ then: () => {}, catch: () => {} })
 * // => true
 *
 * isPromise({ 'x': 0, 'y': 0 })
 * // => false
 *
 * isPromise("Not a promise")
 * // => false
 */
export const isPromise = <T = any>(val: any): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
