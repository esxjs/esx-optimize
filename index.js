'use strict'
const convert = require('to-esx')
const Module = require('module')
const { _compile } = Module.prototype
require('esx') //load esx into the cache
const esx = require.resolve('esx')

Module.prototype._compile = function (content, filename) {
  if (filename === esx) return _compile.call(this, content, filename)
  const converted = convert(content)
  return _compile.call(this, converted, filename)
}

function restore () {
  Module.prototype._compile = _compile
}

module.exports = { restore }
