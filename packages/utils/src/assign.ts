/**
 * `Object.assign()` 的引用。这个方法被用来从一个或多个源对象复制所有可枚举自身属性的值到目标对象。它将返回目标对象。
 *
 * @since 1.0.0
 * @category Object
 * @param {object} target - The target object.
 * @param {...object} sources - The source object(s).
 * @returns {object} Returns the target object.
 * @example
 *
 * const target = { a: 1 }
 * const source = { b: 2 }
 * extend(target, source) // => { a: 1, b: 2 }
 */
export const assign = Object.assign;
