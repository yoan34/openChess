import stylistic from '@stylistic/eslint-plugin'
import love from 'eslint-config-love'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import tseslint from 'typescript-eslint'

export default [
    { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
    ...tseslint.configs.recommended,
    love,
    {
        plugins: {
            '@stylistic': stylistic,
            'import': importPlugin,
            'react': reactPlugin
        },
        files: ['**/*.{js,jsx,ts,tsx}'],
        rules: {
            '@typescript-eslint/no-import-type-side-effects': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/consistent-type-definitions': 'off',
            '@typescript-eslint/strict-boolean-expressions': 'off',
            '@typescript-eslint/no-confusing-void-expression': 'off',
            '@typescript-eslint/no-misused-promises': ['error', {
                'checksVoidReturn': false
            }],
            '@typescript-eslint/consistent-type-imports': 'off',

            '@stylistic/semi': ['error', 'never'],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/no-extra-semi': ['error'],
            '@stylistic/member-delimiter-style': ['error', {
                multiline: {
                    delimiter: 'none',
                    requireLast: false
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false
                }
            }],
            '@stylistic/no-multi-spaces': 'error',
            '@stylistic/comma-dangle': ['error', 'never'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
            '@stylistic/no-multiple-empty-lines': ['error', { 'max': 1, 'maxBOF': 0, 'maxEOF': 0 }],
            '@stylistic/padded-blocks': ['error', 'never'],
            '@stylistic/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

            'import/order': ['error', {
                'groups': ['internal', 'external', 'builtin', 'index', 'sibling', 'parent', 'object'],
                'newlines-between': 'never',
                'alphabetize': {
                    'order': 'asc',
                    'caseInsensitive': true
                },
                'pathGroups': [
                    {
                        'pattern': '@/**',
                        'group': 'internal',
                        'position': 'before'
                    }
                ],
                'pathGroupsExcludedImportTypes': ['builtin', 'type']
            }],

            'react/jsx-curly-spacing': ['error', {
                'when': 'never',
                'attributes': {
                    'allowMultiline': false
                },
                'children': true
            }],
            'react/jsx-tag-spacing': ['error', {
                'closingSlash': 'never',
                'beforeSelfClosing': 'never',
                'afterOpening': 'never',
                'beforeClosing': 'never'
            }],
            'react/jsx-curly-brace-presence': ['error', { 'props': 'never', 'children': 'never' }],
            'react/jsx-max-props-per-line': ['error', { 'maximum': 1, 'when': 'multiline' }]
        }
    },
    {
        ignores: [
            'expo-env.d.ts',
            'babel.config.js',
            'scripts/reset-project.js',
            'android/*',
            'ios/*',
            'functions/*',
            'metro.config.js'
        ]
    }
]