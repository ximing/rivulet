import { toString } from './toString';

/**
 * 将字符串转换为[驼峰命名法](https://en.wikipedia.org/wiki/CamelCase)。
 *
 * @since 1.0.0
 * @category String
 * @param {string} str - 要转换的字符串。
 * @returns {string} 返回驼峰命名法的字符串。
 * @see lowerCase, kebabCase, snakeCase, startCase, upperCase, upperFirst
 * @example
 *
 * camelCase('--foo-bar--')
 * // => 'fooBar'
 */

export const camelCase = (str: any) => {
  str = toString(str);
  return str
    .replace(/^-+|-+$/g, '') // 去除首尾的破折号
    .split('-') // 以破折号分割字符串
    .map((word, index) => {
      if (word) {
        // 将第一个字母大写（除了第一个词）
        return index !== 0 ? word[0].toUpperCase() + word.slice(1) : word;
      }
      return '';
    })
    .join(''); // 将字符串组合起来
};
