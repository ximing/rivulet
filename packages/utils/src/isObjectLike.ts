/**
 * 检查 `value` 是否类似于对象。如果 `value` 不是 `null` 且其 `typeof` 结果为 "object"，则被视为类似于对象。
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果 `value` 类似于对象，则返回 `true`，否则返回 `false`。
 * @example
 *
 * isObjectLike({})
 * // => true
 *
 * isObjectLike([1, 2, 3])
 * // => true
 *
 * isObjectLike(Function)
 * // => false
 *
 * isObjectLike(null)
 * // => false
 */
export function isObjectLike(value) {
  return typeof value === 'object' && value !== null;
}
