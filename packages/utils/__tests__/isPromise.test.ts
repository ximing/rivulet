import { isPromise } from '../src/isPromise'; // 替换为实际的模块路径

describe('isPromise', () => {
  it('should return true for Promise objects', () => {
    expect(isPromise(new Promise((resolve, reject) => {}))).toBe(true);
    expect(isPromise({ then: () => {}, catch: () => {} })).toBe(true);
  });

  it('should return false for non-Promise values', () => {
    expect(isPromise({ x: 0, y: 0 })).toBe(false);
    expect(isPromise('Not a promise')).toBe(false);
    expect(isPromise(null)).toBe(false);
    expect(isPromise(undefined)).toBe(false);
    expect(isPromise(123)).toBe(false);
    expect(isPromise(true)).toBe(false);
    expect(isPromise(function () {})).toBe(false);
  });
});
