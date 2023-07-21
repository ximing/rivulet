import { assign } from '../src/assign'; // 替换为实际的模块路径

describe('assign', () => {
  it('should copy properties from source objects to the target object', () => {
    const target = { a: 1 };
    const source = { b: 2 };
    const result = assign(target, source);

    expect(result).toBe(target);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should overwrite existing properties in the target object', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const result = assign(target, source);

    expect(result).toBe(target);
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('should handle multiple source objects', () => {
    const target = { a: 1 };
    const source1 = { b: 2 };
    const source2 = { c: 3 };
    const result = assign(target, source1, source2);

    expect(result).toBe(target);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  // it('should handle non-object target', () => {
  //   const target = 'abc';
  //   const source = { a: 1, b: 2 };
  //   const result = assign(target, source);
  //   expect(result).toBe(target);
  //   expect(result).toEqual({ a: 1, b: 2 });
  // });

  it('should handle non-object sources', () => {
    const target = { a: 1 };
    const source1 = 'abc';
    const source2 = 123;
    const result = assign(target, source1, source2);

    expect(result).toBe(target);
    expect(result).toEqual({ '0': 'a', '1': 'b', '2': 'c', a: 1 });
  });
});
