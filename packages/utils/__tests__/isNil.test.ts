import { isNil } from '../src/isNil'; // 替换为实际的模块路径

describe('isNil', () => {
  it('should return true for null values', () => {
    expect(isNil(null)).toBe(true);
  });

  it('should return true for undefined values', () => {
    expect(isNil(undefined)).toBe(true);
  });

  it('should return false for non-nullish values', () => {
    expect(isNil(0)).toBe(false);
    expect(isNil(false)).toBe(false);
    expect(isNil('')).toBe(false);
    expect(isNil(NaN)).toBe(false);
    expect(isNil({})).toBe(false);
    expect(isNil([])).toBe(false);
  });
});
