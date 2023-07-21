/**
 * 检查给定的 `key` 是否以 'onUpdate:' 开头。这常常被用来检查对象的属性中的更新事件监听器。
 *
 * @since 1.0.0
 * @category Util
 * @param {string} key The key to check.
 * @returns {boolean} Returns `true` if `key` starts with 'onUpdate:', else `false`.
 * @example
 *
 * isModelListener('onUpdate:value')
 * // => true
 *
 * isModelListener('onClick')
 * // => false
 */
export const isModelListener = (key: string) => key.startsWith('onUpdate:');
