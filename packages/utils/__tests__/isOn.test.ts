import { isOn } from '../src/isOn'; // 替换为实际的模块路径

describe('isOn', () => {
  it('should return true for keys starting with "on" and followed by an uppercase letter', () => {
    expect(isOn('onClick')).toBe(true);
    expect(isOn('onUpdate')).toBe(true);
    expect(isOn('onKeyUp')).toBe(true);
  });

  it('should return false for keys not starting with "on" or not followed by an uppercase letter', () => {
    expect(isOn('click')).toBe(false);
    expect(isOn('onupdate')).toBe(false);
    expect(isOn('on-Event')).toBe(true);
    expect(isOn('onabc')).toBe(false);
    expect(isOn('')).toBe(false);
  });
});
