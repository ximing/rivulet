import { isString } from '../src/isString'; // 替换为实际的模块路径

describe('isString', () => {
  it('should return true for string values', () => {
    expect(isString('abc')).toBe(true);
    expect(isString('')).toBe(true);
  });

  it('should return false for non-string values', () => {
    expect(isString(1)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString({})).toBe(false);
    expect(isString([])).toBe(false);
    expect(isString(true)).toBe(false);
  });
});
