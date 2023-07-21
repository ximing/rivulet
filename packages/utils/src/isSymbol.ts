/**
 * 检查 `value` 是否被归类为一个 `Symbol` 原始类型或对象。
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果 `value` 是一个符号，则返回 `true`，否则返回 `false`。
 * @example
 *
 * isSymbol(Symbol.iterator)
 * // => true
 *
 * isSymbol('abc')
 * // => false
 */
export function isSymbol(value) {
  const type = typeof value;
  return type == 'symbol';
}
