/**
 * 检查 `value` 是否为 `Object` 的[语言类型](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)。
 * （例如，数组、函数、对象、正则表达式、`new Number(0)` 和 `new String('')`）
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果 `value` 是对象，则返回 `true`，否则返回 `false`。
 * @example
 *
 * isObject({})
 * // => true
 *
 * isObject([1, 2, 3])
 * // => true
 *
 * isObject(Function)
 * // => true
 *
 * isObject(null)
 * // => false
 */
export function isObject(value) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}
