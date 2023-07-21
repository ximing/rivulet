import { isMap } from '../src/isMap'; // 替换为实际的模块路径

describe('isMap', () => {
  it('should return true for Map objects', () => {
    expect(isMap(new Map())).toBe(true);
  });

  it('should return false for non-Map values', () => {
    expect(isMap(new WeakMap())).toBe(false);
    expect(isMap({})).toBe(false);
    expect(isMap([])).toBe(false);
    expect(isMap(123)).toBe(false);
    expect(isMap(null)).toBe(false);
    expect(isMap(undefined)).toBe(false);
    expect(isMap(/abc/)).toBe(false);
  });
});
