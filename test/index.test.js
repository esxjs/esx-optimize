'use strict'
const { test } = require('tap')

const expected = `() => {
  return esx \`<div>hi</div>\`
}`

test('patches module system to convert module sources', async ({ is }) => {
  const { restore } = require('..').install()
  is(require('./fixture').toString(), expected)
  restore()
})
