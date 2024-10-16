const plugin = {
  meta: {
    name: 'eslint-plugin-custom-rules'
  },
  rules: {
    'no-empty-catch': {
      create (context: any) {
        return {
          CatchClause (node: any) {
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
