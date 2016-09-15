import {defineTest} from 'jscodeshift/dist/testUtils'

defineTest(__dirname, 'MochaToJestTransform', null, 'DescribeBlock')
defineTest(__dirname, 'MochaToJestTransform', null, 'DescribeOnlyBlock')
defineTest(__dirname, 'MochaToJestTransform', null, 'DescribeSkipBlock')
defineTest(__dirname, 'MochaToJestTransform', null, 'ItBlock')
defineTest(__dirname, 'MochaToJestTransform', null, 'ItOnlyBlock')
defineTest(__dirname, 'MochaToJestTransform', null, 'ItSkipBlock')
