/**

检查 value 是否被归类为一个 String 原始类型或对象。
@since 1.0.0
@category Lang
@param {*} value 要检查的值。
@returns {boolean} 如果 value 是一个字符串，则返回 true，否则返回 false。
@example
isString('abc')
// => true
isString(1)
// => false
*/
export const isString = (val: unknown): val is string =>
  typeof val === 'string';
