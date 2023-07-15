module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'jest'],
    extends: ['standard', 'prettier', 'plugin:@typescript-eslint/recommended'],
    env: {
        'jest/globals': true,
        es6: true,
    },
    globals: {},
    settings: {},
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/class-name-casing': 'off',
        'import/prefer-default-export': 'off',
        'no-eval': 'off',
        eqeqeq: 'off',
        'new-cap': 'off',
        'no-debugger': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        'no-useless-constructor': 'off',
        'no-useless-call': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_', args: 'after-used' },
        ],
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/interface-name-prefix': 0,
        '@typescript-eslint/member-delimiter-style': 0,
        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/no-namespace': 0,
        'standard/no-callback-literal': 0,
        'no-console': 0,
        'prefer-spread': 0,
        'prefer-rest-params': 0,
        'no-prototype-builtins': 0,
        '@typescript-eslint/triple-slash-reference': 0,
        '@typescript-eslint/explicit-member-accessibility': 'off',
        'promise/param-names': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        camelcase: ['error', { allow: ['^internal_', '^unstable_'] }],
    },
};
