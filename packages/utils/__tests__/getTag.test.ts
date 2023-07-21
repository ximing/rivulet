import { getTag } from '../src/getTag'; // 替换为实际的模块路径

describe('getTag', () => {
  it('should return the toStringTag for numbers', () => {
    expect(getTag(2)).toBe('[object Number]');
  });

  it('should return the toStringTag for strings', () => {
    expect(getTag('abc')).toBe('[object String]');
  });

  it('should return the toStringTag for null', () => {
    expect(getTag(null)).toBe('[object Null]');
  });

  it('should return the toStringTag for undefined', () => {
    expect(getTag(undefined)).toBe('[object Undefined]');
  });

  it('should return the toStringTag for objects', () => {
    expect(getTag({})).toBe('[object Object]');
  });

  it('should return the toStringTag for arrays', () => {
    expect(getTag([])).toBe('[object Array]');
  });

  it('should return the toStringTag for functions', () => {
    expect(getTag(() => {})).toBe('[object Function]');
  });

  it('should return the toStringTag for regular expressions', () => {
    expect(getTag(/regex/)).toBe('[object RegExp]');
  });

  it('should return the toStringTag for dates', () => {
    expect(getTag(new Date())).toBe('[object Date]');
  });

  it('should return the toStringTag for custom classes', () => {
    class CustomClass {}
    expect(getTag(new CustomClass())).toBe('[object Object]');
  });

  it('should return the toStringTag for other built-in objects', () => {
    expect(getTag(Math)).toBe('[object Math]');
  });
});
