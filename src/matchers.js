export function isDescribeOrItBlock (node) {
  return isAnyDescribeBlock(node) || isAnyItBlock(node)
}

const isAnyDescribeBlock = node =>
  isDescribeIdentifier(node) ||
  isDescribeOnlyExpression(node) ||
  isDescribeSkipExpression(node)

const isAnyItBlock = node =>
  isItIdentifier(node) ||
  isItOnlyExpression(node) ||
  isItSkipExpression(node)

const isDescribeIdentifier = node =>
  node.type === 'Identifier' && node.name === 'describe'

export const isDescribeOnlyExpressionPath = path => isDescribeOnlyExpression(path.value)

const isDescribeOnlyExpression = node => {
  return node.type === 'MemberExpression' &&
    isDescribeIdentifier(node.object) &&
    isOnlyIdentifier(node.property)
}

export const isDescribeSkipExpressionPath = path => isDescribeSkipExpression(path.value)

const isDescribeSkipExpression = node => {
  return node.type === 'MemberExpression' &&
    isDescribeIdentifier(node.object) &&
    isSkipIdentifier(node.property)
}

const isItIdentifier = node =>
  node.type === 'Identifier' && node.name === 'it'

export const isItOnlyExpressionPath = path => isItOnlyExpression(path.value)

const isItOnlyExpression = node => {
  return node.type === 'MemberExpression' &&
    isItIdentifier(node.object) &&
    isOnlyIdentifier(node.property)
}

export const isItSkipExpressionPath = path => isItSkipExpression(path.value)

const isItSkipExpression = node => {
  return node.type === 'MemberExpression' &&
    isItIdentifier(node.object) &&
    isSkipIdentifier(node.property)
}

const isOnlyIdentifier = node =>
  node.type === 'Identifier' && node.name === 'only'

const isSkipIdentifier = node =>
  node.type === 'Identifier' && node.name === 'skip'
