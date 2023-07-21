import { isSymbol } from './isSymbol';

/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0;

/**
 * 将 `value` 转换为字符串。对于 `null` 和 `undefined` 值，返回空字符串。负零的符号被保留。
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value 要转换的值。
 * @returns {string} 返回转换后的字符串。
 * @example
 *
 * toString(null)
 * // => ''
 *
 * toString(-0)
 * // => '-0'
 *
 * toString([1, 2, 3])
 * // => '1,2,3'
 */
export function toString(value: any) {
  if (value == null) {
    return '';
  }
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return `${value.map((other) => (other == null ? other : toString(other)))}`;
  }
  if (isSymbol(value)) {
    return value.toString();
  }
  const result = `${value}`;
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}
