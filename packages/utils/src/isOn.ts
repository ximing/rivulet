const onRE = /^on[^a-z]/;

/**
 * 检查给定的 `key` 是否以 'on' 开头，后面跟着一个大写字母。这经常用于检查对象的属性中的 on* 事件处理程序。
 *
 * @since 1.0.0
 * @category Util
 * @param {string} key The key to check.
 * @returns {boolean} Returns `true` if `key` starts with 'on' and followed by an uppercase letter, else `false`.
 * @example
 *
 * isOn('onClick')
 * // => true
 *
 * isOn('onupdate')
 * // => false
 */
export const isOn = (key: string) => onRE.test(key);
