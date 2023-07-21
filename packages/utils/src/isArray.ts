/**
 * 检查`value`是否被归类为一个数组对象。该函数使用内置的`Array.isArray()`方法来确定一个值是否为数组。
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果`value`是一个数组，则返回`true`，否则返回`false`。
 * @example
 *
 * isArray([1, 2, 3])
 * // => true
 *
 * isArray({ 'x': 0, 'y': 0 })
 * // => false
 *
 * isArray("Not an array")
 * // => false
 */
export const isArray = Array.isArray;
