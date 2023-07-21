import { toString } from '../src/toString'; // 替换为实际的模块路径

describe('toString', () => {
  it('should return an empty string for null and undefined values', () => {
    expect(toString(null)).toBe('');
    expect(toString(undefined)).toBe('');
  });

  it('should return the string representation of non-null values', () => {
    expect(toString(123)).toBe('123');
    expect(toString('abc')).toBe('abc');
    expect(toString(true)).toBe('true');
    expect(toString(false)).toBe('false');
    expect(toString(0)).toBe('0');
  });

  it('should preserve the sign of -0', () => {
    expect(toString(-0)).toBe('-0');
  });

  it('should convert arrays to comma-separated strings', () => {
    expect(toString([1, 2, 3])).toBe('1,2,3');
    expect(toString(['a', 'b', 'c'])).toBe('a,b,c');
    expect(toString([])).toBe('');
  });

  it('should recursively convert values in arrays', () => {
    const nestedArray = [1, [2, [3, [4]]]];
    expect(toString(nestedArray)).toBe('1,2,3,4');
  });

  it('should convert symbols to their string representation', () => {
    const symbol = Symbol('test');
    expect(toString(symbol)).toBe(symbol.toString());
  });
});
