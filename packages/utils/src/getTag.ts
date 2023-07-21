const toString = Object.prototype.toString;
/**
 * 获取`value`的toStringTag。toStringTag是一个标准的内置属性，用于对象的默认字符串描述。
 * 它用于更好地、更健壮地对值进行类型标记，特别用于调试和错误处理目的。
 * 例如，即使在JavaScript中它们都是假值，null和undefined类型也是有区别的。
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value 要获取toStringTag的值。
 * @returns {string} 返回`value`的toStringTag。
 * @example
 *
 * getTag(2)
 * // => '[object Number]'
 *
 * getTag('abc')
 * // => '[object String]'
 *
 * getTag(null)
 * // => '[object Null]'
 *
 * getTag(undefined)
 * // => '[object Undefined]'
 *
 * getTag({})
 * // => '[object Object]'
 */

export function getTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return toString.call(value);
}
