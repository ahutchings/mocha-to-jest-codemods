# mocha-to-jest-codemods

[![Build Status](https://travis-ci.org/ahutchings/mocha-to-jest-codemods.svg?branch=master)](https://travis-ci.org/ahutchings/mocha-to-jest-codemods)
[![Coverage Status](https://coveralls.io/repos/github/ahutchings/mocha-to-jest-codemods/badge.svg)](https://coveralls.io/github/ahutchings/mocha-to-jest-codemods)
[![Dependency Status](https://david-dm.org/ahutchings/mocha-to-jest-codemods.svg)](https://david-dm.org/ahutchings/mocha-to-jest-codemods)
[![devDependency Status](https://david-dm.org/ahutchings/mocha-to-jest-codemods/dev-status.svg)](https://david-dm.org/ahutchings/mocha-to-jest-codemods#info=devDependencies)

**🚨  This is a work in progress. Use with caution!**

## Usage

```sh
npm install -g jscodeshift
git clone https://github.com/ahutchings/mocha-to-jest-codemods.git
jscodeshift -t mocha-to-jest-codemods/src/MochaToJestTransform.js <file>
```
