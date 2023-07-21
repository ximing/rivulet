import { memoize } from '../src/memoize'; // 替换为实际的模块路径

describe('memoize', () => {
  it('should memoize the result of the function', () => {
    const mockFunc = jest.fn((a, b) => a + b);
    const memoizedFunc = memoize(mockFunc);

    expect(memoizedFunc(1, 2)).toBe(3);
    expect(mockFunc).toHaveBeenCalledTimes(1);
    expect(memoizedFunc(1, 2)).toBe(3);
    expect(mockFunc).toHaveBeenCalledTimes(1); // Result is retrieved from cache

    expect(memoizedFunc(3, 4)).toBe(7);
    expect(mockFunc).toHaveBeenCalledTimes(2);
    expect(memoizedFunc(3, 4)).toBe(7);
    expect(mockFunc).toHaveBeenCalledTimes(2); // Result is retrieved from cache
  });

  it('should use the resolver function to determine cache key', () => {
    const mockFunc = jest.fn((a, b) => a + b);
    const resolver = jest.fn((a, b) => `${a}-${b}`);
    const memoizedFunc = memoize(mockFunc, resolver);

    expect(memoizedFunc(1, 2)).toBe(3);
    expect(mockFunc).toHaveBeenCalledTimes(1);
    expect(resolver).toHaveBeenCalledWith(1, 2);

    expect(memoizedFunc(1, 2)).toBe(3);
    expect(mockFunc).toHaveBeenCalledTimes(1); // Result is retrieved from cache
    expect(resolver).toHaveBeenCalledTimes(2);

    expect(memoizedFunc(3, 4)).toBe(7);
    expect(mockFunc).toHaveBeenCalledTimes(2);
    expect(resolver).toHaveBeenCalledWith(3, 4);

    expect(memoizedFunc(3, 4)).toBe(7);
    expect(mockFunc).toHaveBeenCalledTimes(2); // Result is retrieved from cache
    expect(resolver).toHaveBeenCalledTimes(4);
  });

  it('should throw a TypeError for invalid input', () => {
    //@ts-check
    expect(() => memoize()).toThrow(TypeError);
    expect(() => memoize('abc')).toThrow(TypeError);
    expect(() => memoize(() => {}, 'abc')).toThrow(TypeError);
  });
});
