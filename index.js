'use strict'
const convert = require('to-esx')
const Module = require('module')
const { _compile } = Module.prototype
require('esx') //load esx into the cache
const esx = require.resolve('esx')

const preloaded = require.main === undefined

function install (opts = {}) {
  const { exclude = () => false } = opts
  Module.prototype._compile = function (content, filename) {
    if (filename === esx || exclude(filename)) {
      return _compile.call(this, content, filename)
    }
    const converted = convert(content)
    return _compile.call(this, converted, filename)
  }
  return module.exports
}

function restore () {
  Module.prototype._compile = _compile
  return module.exports
}

if (preloaded) install()

module.exports = { install, restore }
