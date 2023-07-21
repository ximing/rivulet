/**
 * 检查 value 是否为 null 或 undefined。
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果 value 是 nullish（null 或 undefined），则返回 true，否则返
 * @example
 *
 * isNil(null)
 * // => true
 *
 * isNil(void 0)
 * // => true
 *
 * isNil(NaN)
 * // => false
 */
export function isNil(value) {
  return value == null;
}
