import { no } from '../src/no'; // 替换为实际的模块路径
import { noop } from '../src/noop'; // 替换为实际的模块路径

describe('NO', () => {
  it('should always return false', () => {
    expect(no()).toBe(false);
    expect(no()).toBeFalsy();
    expect(no()).not.toBeTruthy();
  });
});

describe('noop', () => {
  it('should do nothing when called', () => {
    expect(noop()).toBeUndefined();
    expect(noop(1, 2, 3)).toBeUndefined();
    expect(noop('abc', { a: 1 })).toBeUndefined();
  });
});
