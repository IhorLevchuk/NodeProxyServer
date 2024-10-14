const plugin = {
  meta: {
    name: 'eslint-plugin-custom-rules'
  },
  rules: {
    'no-empty-catch': {
      create (context) {
        return {
          CatchClause (node) {
            if (node.body.body.length === 0) {
              context.report({ node: node.body, messageId: 'emptyCatch' })
            }
          }
        }
      }
    }
  }
}

export default plugin
