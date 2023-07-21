import { toNumber } from '../src/toNumber'; // 替换为实际的模块路径

describe('toNumber', () => {
  it('should return the number value if input is already a number', () => {
    expect(toNumber(3.2)).toBe(3.2);
    expect(toNumber(Number.MIN_VALUE)).toBe(5e-324);
    expect(toNumber(Infinity)).toBe(Infinity);
  });

  it('should return NaN for symbol values', () => {
    const symbol = Symbol('test');
    expect(toNumber(symbol)).toBeNaN();
  });

  it('should convert string values to numbers', () => {
    expect(toNumber('3.2')).toBe(3.2);
    expect(toNumber('0')).toBe(0);
    expect(toNumber('-123')).toBe(-123);
    expect(toNumber('Infinity')).toBe(Infinity);
    expect(toNumber('')).toBe(0);
    expect(toNumber('   3.2   ')).toBe(3.2);
  });

  it('should return 0 for non-numeric string values', () => {
    expect(toNumber('abc')).toBe(NaN);
    expect(toNumber('123abc')).toBe(NaN);
    expect(toNumber('   abc   ')).toBe(NaN);
  });

  it('should return the original value if it cannot be converted to a number', () => {
    const obj = { a: 1 };
    const arr = [1, 2, 3];
    expect(toNumber(obj)).toBe(NaN);
    expect(toNumber(arr)).toBe(NaN);
  });
});
