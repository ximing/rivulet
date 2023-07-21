/**
 * 检查指定对象`val`是否具有给定的键`key`作为其自己的属性。
 *
 * `hasOwn`函数是检查自有属性的更安全的方法，比使用内置的`obj.hasOwnProperty`要好。
 * 它使用`Object.prototype.hasOwnProperty`方法来避免可能来自对象原型的阴影。
 *
 * @since 1.0.0
 * @category Object
 * @param {object} val - 要检查的对象。
 * @param {string | symbol} key - 要检查的键。
 * @returns {boolean} 如果对象有键作为它自己的则返回`true`，否则返回`false`。
 * @example
 *
 * const obj = { a: 1 };
 *
 * hasOwn(obj, 'a');
 * // => true
 *
 * hasOwn(obj, 'b');
 * // => false
 */
export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => Object.prototype.hasOwnProperty.call(val, key);
