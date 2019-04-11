'use strict'
const convert = require('to-esx')
const Module = require('module')
const { _compile } = Module.prototype
require('esx') //load esx into the cache
const esx = require.resolve('esx')

process.emitWarning('esx/optimize is currently an experimental feature please expect breakage and report issues!')

Module.prototype._compile = function (content, filename) {
  if (filename === esx) return _compile.call(this, content, filename)
  const converted = convert(content)
  try { 
    return _compile.call(this, converted, filename)
  } catch (e) {
    process.emitWarning(`Unable to convert ${filename}:\n ${e}`)
    return _compile.call(this, content, filename)
  }
}

function restore () {
  Module.prototype._compile = _compile
}

module.exports = { restore }
