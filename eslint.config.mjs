import js from '@eslint/js'
import standard from 'eslint-config-standard'
import pluginImport from 'eslint-plugin-import'
import pluginPromise from 'eslint-plugin-promise'
import pluginN from 'eslint-plugin-n'
import tseslint from 'typescript-eslint'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      n: pluginN,
      import: pluginImport,
      promise: pluginPromise
    },
    languageOptions: {
      parser: tseslint.parser
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      ...standard.rules
    }
  }
]
