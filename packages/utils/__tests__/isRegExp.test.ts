import { isRegExp } from '../src/isRegExp'; // 替换为实际的模块路径

describe('isRegExp', () => {
  it('should return true for RegExp objects', () => {
    expect(isRegExp(/abc/)).toBe(true);
  });

  it('should return false for non-RegExp values', () => {
    expect(isRegExp('/abc/')).toBe(false);
    expect(isRegExp({})).toBe(false);
    expect(isRegExp([])).toBe(false);
    expect(isRegExp(123)).toBe(false);
    expect(isRegExp(null)).toBe(false);
    expect(isRegExp(undefined)).toBe(false);
  });
});
