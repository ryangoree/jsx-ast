const babelParser = require('@babel/parser')
const fs = require('fs')

module.exports = (path, { typescript }) => {
  const content = fs.readFileSync(path, 'utf-8')
  const plugins = ['jsx']
  if (typescript) {
    plugins.push('typescript')
  }
  return babelParser.parse(content, {
    sourceType: 'module',
    plugins,
  })
}
