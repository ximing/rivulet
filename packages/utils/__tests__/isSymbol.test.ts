import { isSymbol } from '../src/isSymbol'; // 替换为实际的模块路径

describe('isSymbol', () => {
  it('should return true for symbol values', () => {
    expect(isSymbol(Symbol.iterator)).toBe(true);
  });

  it('should return false for non-symbol values', () => {
    expect(isSymbol('abc')).toBe(false);
    expect(isSymbol(123)).toBe(false);
    expect(isSymbol(null)).toBe(false);
    expect(isSymbol(undefined)).toBe(false);
    expect(isSymbol({})).toBe(false);
    expect(isSymbol([])).toBe(false);
    expect(isSymbol(true)).toBe(false);
  });
});
