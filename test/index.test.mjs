'use strict'
import tap from 'tap'
import fixture from './fixture'
const { test } = tap
const expected = `() => {
  return esx \`<div>hi</div>\`
}`

test('patches module system to convert module sources', async ({ is }) => {
  is(fixture.toString(), expected)
})
