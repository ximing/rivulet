import { getTag } from './getTag';
import { isObjectLike } from './isObjectLike';
/**
 * 检查 `value` 是否为纯对象，即由 `Object` 构造函数创建的对象或具有 `[[Prototype]]` 为 `null` 的对象。
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果 `value` 是纯对象，则返回 `true`，否则返回 `false`。
 * @example
 *
 * function Foo() {
 *   this.a = 1
 * }
 *
 * isPlainObject(new Foo)
 * // => false
 *
 * isPlainObject([1, 2, 3])
 * // => false
 *
 * isPlainObject({ 'x': 0, 'y': 0 })
 * // => true
 *
 * isPlainObject(Object.create(null))
 * // => true
 */
export function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) != '[object Object]') {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}
