import { isObject } from '../src/isObject'; // 替换为实际的模块路径
import { isObjectLike } from '../src/isObjectLike'; // 替换为实际的模块路径
import { isPlainObject } from '../src/isPlainObject'; // 替换为实际的模块路径

describe('isObject', () => {
  it('should return true for objects', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(new Number(0))).toBe(true);
    expect(isObject(new String(''))).toBe(true);
    expect(isObject(/regex/)).toBe(true);
    expect(isObject(function () {})).toBe(true);
    expect(isObject(() => {})).toBe(true);
  });

  it('should return true for built-in objects', () => {
    expect(isObject(Math)).toBe(true);
    expect(isObject(Array)).toBe(true);
    expect(isObject(Date)).toBe(true);
  });

  it('should return false for null and non-object values', () => {
    expect(isObject(null)).toBe(false);
    expect(isObject(123)).toBe(false);
    expect(isObject('abc')).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });
});

describe('isObjectLike', () => {
  it('should return true for object-like values', () => {
    expect(isObjectLike({})).toBe(true);
    expect(isObjectLike([])).toBe(true);
    expect(isObjectLike(new Number(0))).toBe(true);
    expect(isObjectLike(new String(''))).toBe(true);
    expect(isObjectLike(/regex/)).toBe(true);
  });

  it('should return false for non-object-like values', () => {
    expect(isObjectLike(null)).toBe(false);
    expect(isObjectLike(123)).toBe(false);
    expect(isObjectLike('abc')).toBe(false);
    expect(isObjectLike(true)).toBe(false);
    expect(isObjectLike(undefined)).toBe(false);
    expect(isObjectLike(function () {})).toBe(false);
    expect(isObjectLike(() => {})).toBe(false);
  });
});

describe('isPlainObject', () => {
  it('should return true for plain objects', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
    expect(isPlainObject({ x: 0, y: 0 })).toBe(true);
  });

  it('should return false for non-plain objects', () => {
    function Foo() {
      this.a = 1;
    }
    expect(isPlainObject(new Foo())).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(123)).toBe(false);
    expect(isPlainObject('abc')).toBe(false);
    expect(isPlainObject(true)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(function () {})).toBe(false);
  });
});
