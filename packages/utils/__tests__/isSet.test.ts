import { isSet } from '../src/isSet'; // 替换为实际的模块路径

describe('isSet', () => {
  it('should return true for Set objects', () => {
    expect(isSet(new Set())).toBe(true);
  });

  it('should return false for non-Set values', () => {
    expect(isSet(new WeakSet())).toBe(false);
    expect(isSet({})).toBe(false);
    expect(isSet([])).toBe(false);
    expect(isSet(123)).toBe(false);
    expect(isSet(null)).toBe(false);
    expect(isSet(undefined)).toBe(false);
  });
});
