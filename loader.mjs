import path from 'path'
import process from 'process'
import Module from 'module'
import vm from 'vm'
import convert from 'to-esx'
import '.'
if (!('SourceTextModule' in vm)) {
  throw Error('enable the --experimental-vm-modules flag')
}
const builtins = Module.builtinModules
const JS_EXTENSIONS = new Set(['.js', '.mjs'])

const baseURL = new URL('file://')
baseURL.pathname = `${process.cwd()}/`

export function resolve(specifier, parentModuleURL = baseURL, defaultResolve) {
  if (builtins.includes(specifier)) {
    return {
      url: specifier,
      format: 'builtin'
    }
  }
  if (/^\.{0,2}[/]/.test(specifier) !== true && !specifier.startsWith('file:')) {
    // node_modules support:
    return defaultResolve(specifier, parentModuleURL)
  }
  const resolved = new URL(specifier, parentModuleURL)
  const ext = path.extname(resolved.pathname)
  if (!JS_EXTENSIONS.has(ext)) {
    return defaultResolve(specifier, parentModuleURL)
  }

  return {
    url: y.href,
    format: 'dynamic'
  }
}

export async function dynamicInstantiate(url, ...args) {
  console.log(url, ...args)

  // get path from url
  // read file path
  // const dep = new vm.SourceTextModule(...)
  // await dep.link(await (specifier, referencingModule) => {
  //  get path from specifier
  //  read file path (figure out module type .mjs, .js):
  //    .mjs:
  //      new vm.SourceTextModule(convert(content))
  //    .js:
  //      require and let module _compile override do the work
  //})
  // dep.instantiate()
  // const { result } = await dep.evaluate()
  // figure out the exports from result
  // mirror the exports in the execute method

  return {
    exports: ['default'],
    execute: (exports) => {
      // Get and set functions provided for pre-allocated export names
      exports.default.set('value');
    }
  };
}