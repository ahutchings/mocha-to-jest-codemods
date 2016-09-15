import {
  isDescribeOrItBlock,
  isDescribeOnlyExpressionPath,
  isDescribeSkipExpressionPath,
  isItOnlyExpressionPath,
  isItSkipExpressionPath
} from './matchers'

export default (file, api, options) => {
  const j = api.jscodeshift
  const root = j(file.source)

  const printOptions = options.printOptions || {quote: 'single'}

  root
    .find(j.ExpressionStatement)
    .filter(isMochaGlobalFunctionExpressionStatement)
    .forEach(replaceSpecFunctionExpression)

  function isMochaGlobalFunctionExpressionStatement (path) {
    return path.node.expression.type === 'CallExpression' &&
      isDescribeOrItBlock(path.node.expression.callee)
  }

  function replaceSpecFunctionExpression (path) {
    const spec = path.node.expression.arguments[1]
    path.node.expression.arguments[1] = j.arrowFunctionExpression(
      [],
      spec.body
    )
  }

  root
    .find(j.MemberExpression)
    .filter(isDescribeOnlyExpressionPath)
    .forEach((node) => { j(node).replaceWith(j.identifier('fdescribe')) })

  root
    .find(j.MemberExpression)
    .filter(isDescribeSkipExpressionPath)
    .forEach((node) => { j(node).replaceWith(j.identifier('xdescribe')) })

  root
    .find(j.MemberExpression)
    .filter(isItOnlyExpressionPath)
    .forEach((node) => { j(node).replaceWith(j.identifier('fit')) })

  root
    .find(j.MemberExpression)
    .filter(isItSkipExpressionPath)
    .forEach((node) => { j(node).replaceWith(j.identifier('xit')) })

  return root.toSource(printOptions)
}
