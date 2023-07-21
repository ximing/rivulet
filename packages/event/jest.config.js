module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/esm/', '/cjs/'],
  testRegex: '.*\\.test\\.tsx?$',
  coveragePathIgnorePatterns: ['/__tests__/'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
