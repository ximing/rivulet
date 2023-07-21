/**
 * 创建一个将 `func` 的结果进行记忆化的函数。如果提供了 `resolver`，它将根据提供给记忆化函数的参数确定用于存储结果的缓存键。
 * 默认情况下，记忆化函数使用提供给它的第一个参数作为映射缓存键。`func` 使用记忆化函数的 `this` 绑定进行调用。
 *
 * **注意：** 缓存以 `cache` 属性的形式暴露在记忆化函数上。可以通过将 `memoize.Cache` 构造函数替换为一个实例实现了 [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object) 方法接口的对象来自定义其创建方式，包括 `clear`、`delete`、`get`、`has` 和 `set`。
 *
 * @since 1.0.0
 * @category Function
 * @param {Function} func 要进行结果记忆化的函数。
 * @param {Function} [resolver] 解析缓存键的函数。
 * @returns {Function} 返回新的记忆化函数。
 * @example
 *
 * const object = { 'a': 1, 'b': 2 }
 * const other = { 'c': 3, 'd': 4 }
 *
 * const values = memoize(values)
 * values(object)
 * // => [1, 2]
 *
 * values(other)
 * // => [3, 4]
 *
 * object.a = 2
 * values(object)
 * // => [1, 2]
 *
 * // 修改结果缓存。
 * values.cache.set(object, ['a', 'b'])
 * values(object)
 * // => ['a', 'b']
 *
 * // 替换 `memoize.Cache`。
 * memoize.Cache = WeakMap
 */
export function memoize(this: any, func: any, resolver?: any) {
  if (
    typeof func !== 'function' ||
    (resolver != null && typeof resolver !== 'function')
  ) {
    throw new TypeError('Expected a function');
  }
  const memoized = function (this: any, ...args) {
    const key = resolver ? resolver.apply(this, args) : args[0];
    const cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || Map)();
  return memoized;
}

memoize.Cache = Map;
