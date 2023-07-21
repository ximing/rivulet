import { isFunction } from '../src/isFunction'; // 替换为实际的模块路径

describe('isFunction', () => {
  it('should return true for function declarations', () => {
    function test() {}
    expect(isFunction(test)).toBe(true);
  });

  it('should return true for function expressions', () => {
    const test = function () {};
    expect(isFunction(test)).toBe(true);
  });

  it('should return true for arrow functions', () => {
    const test = () => {};
    expect(isFunction(test)).toBe(true);
  });

  it('should return true for async functions', () => {
    const test = async () => {};
    expect(isFunction(test)).toBe(true);
  });

  it('should return true for generator functions', () => {
    function* test() {}
    expect(isFunction(test)).toBe(true);
  });

  it('should return true for built-in functions', () => {
    expect(isFunction(Math.round)).toBe(true);
  });

  it('should return false for non-function values', () => {
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
    expect(isFunction(123)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(/abc/)).toBe(false);
  });
});
