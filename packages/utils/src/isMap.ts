import { getTag } from './getTag';

/**
 * 检查`value`是否被归类为一个`Map`对象。
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value 要检查的值。
 * @returns {boolean} 如果`value`是一个Map，则返回`true`，否则返回`false`。
 * @example
 *
 * isMap(new Map)
 * // => true
 *
 * isMap(new WeakMap)
 * // => false
 */
export const isMap = (value) => getTag(value) == '[object Map]';
