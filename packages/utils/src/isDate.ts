import { getTag } from './getTag';

/**
 * 检查`value`是否被归类为一个`Date`对象。
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果`value`是一个日期对象，则返回`true`，否则返回`false`。
 * @example
 *
 * isDate(new Date)
 * // => true
 *
 * isDate('Mon April 23 2012')
 * // => false
 */
export const isDate = (value) => getTag(value) == '[object Date]';
