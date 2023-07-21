import { isModelListener } from '../src/isModelListener'; // 替换为实际的模块路径

describe('isModelListener', () => {
  it('should return true for keys starting with "onUpdate:"', () => {
    expect(isModelListener('onUpdate:value')).toBe(true);
    expect(isModelListener('onUpdate:abc')).toBe(true);
    expect(isModelListener('onUpdate:')).toBe(true);
  });

  it('should return false for keys not starting with "onUpdate:"', () => {
    expect(isModelListener('onClick')).toBe(false);
    expect(isModelListener('update:value')).toBe(false);
    expect(isModelListener('onUpdate')).toBe(false);
    expect(isModelListener('')).toBe(false);
    expect(isModelListener('onUpdateabc')).toBe(false);
  });
});
