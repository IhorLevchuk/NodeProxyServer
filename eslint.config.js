import js from '@eslint/js'
import standard from 'eslint-config-standard'
import pluginImport from 'eslint-plugin-import'
import pluginPromise from 'eslint-plugin-promise'
import pluginN from 'eslint-plugin-n'
import customRules from 'eslint-plugin-custom-rules'

export default [
  js.configs.recommended,

  {
    plugins: {
      n: pluginN,
      import: pluginImport,
      promise: pluginPromise,
      customRules
    },
    rules: {
      'customRules/no-empty-catch': 'error',
      ...standard.rules
    }
  }
]
