import { camelCase } from '../src/camelCase';

describe('camelCase', () => {
  it('should convert kebab case string to camel case', () => {
    expect(camelCase('--foo-bar--')).toBe('fooBar');
  });

  it('should convert snake case string to camel case', () => {
    expect(camelCase('__foo_bar__')).toBe('__foo_bar__');
  });

  it('should convert space separated string to camel case', () => {
    expect(camelCase('hello world')).toBe('hello world');
  });

  it('should convert empty string to empty string', () => {
    expect(camelCase('')).toBe('');
  });

  it('should convert string with only one word to the same word', () => {
    expect(camelCase('foobar')).toBe('foobar');
  });

  it('should convert string with leading and trailing dashes to camel case', () => {
    expect(camelCase('--foo-bar--')).toBe('fooBar');
  });

  it('should convert string with multiple consecutive dashes to camel case', () => {
    expect(camelCase('foo--bar---baz')).toBe('fooBarBaz');
  });
});
