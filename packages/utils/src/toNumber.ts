import { isSymbol } from './isSymbol';

/** Used as references for various `Number` constants. */
const NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
const reTrim = /^\s+|\s+$/g;

/**
 * 将 `value` 转换为数字。
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value 要处理的值。
 * @returns {number} 返回数字。
 * @see isInteger, toInteger, isNumber
 * @example
 *
 * toNumber(3.2)
 * // => 3.2
 *
 * toNumber(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toNumber(Infinity)
 * // => Infinity
 *
 * toNumber('3.2')
 * // => 3.2
 */
export function toNumber(value) {
  if (typeof value === 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (typeof value !== 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  return +value;
}
