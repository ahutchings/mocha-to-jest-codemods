export default (file, api, options) => {
  const j = api.jscodeshift
  const root = j(file.source)

  const printOptions = options.printOptions || {quote: 'single'}

  const didUpdateSpecFunctionExpressions = root
    .find(j.FunctionExpression)
    .filter(isSpecFunctionExpressionPath)
    .forEach(replaceFunctionExpressionWithArrowFunctionExpression)
    .size() > 0

  function replaceFunctionExpressionWithArrowFunctionExpression (node) {
    j(node).replaceWith(
      j.arrowFunctionExpression([], node.value.body)
    )
  }

  const didUpdateItOnlyExpressions = root
    .find(j.MemberExpression)
    .filter(isItOnlyExpressionPath)
    .forEach(replaceItOnlyExpression)
    .size() > 0

  function replaceItOnlyExpression (node) {
    j(node).replaceWith(
      j.identifier('fit')
    )
  }

  const didUpdate = (
    didUpdateSpecFunctionExpressions ||
    didUpdateItOnlyExpressions
  )

  return didUpdate ? root.toSource(printOptions) : null
}

function isSpecFunctionExpressionPath (path) {
  return (
    path.parentPath.name === 'arguments' &&
    path.parentPath.parentPath.value.type === 'CallExpression' &&
    isDescribeOrItBlock(path.parentPath.parentPath.value.callee)
  )
}

function isDescribeOrItBlock (node) {
  return isAnyDescribeBlock(node) || isAnyItBlock(node)
}

const isAnyDescribeBlock = node =>
  isDescribeIdentifier(node)

const isAnyItBlock = node =>
  isItIdentifier(node) ||
  isItOnlyExpression(node)

const isDescribeIdentifier = node =>
  node.type === 'Identifier' && node.name === 'describe'

const isItIdentifier = node =>
  node.type === 'Identifier' && node.name === 'it'

const isItOnlyExpressionPath = path => isItOnlyExpression(path.value)

const isItOnlyExpression = node => {
  return node.type === 'MemberExpression' &&
    isItIdentifier(node.object) &&
    isOnlyIdentifier(node.property)
}

const isOnlyIdentifier = node =>
  node.type === 'Identifier' && node.name === 'only'
