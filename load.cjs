const path=require('node:path');const {createRequire}=require('node:module');
function loadBinaryJavascript(filename) {
  const binary = { exports: {} }
  process.dlopen(binary, filename)
  if (typeof binary.exports !== 'function') throw Error('Invalid compiled JavaScript module')
  const loaded = { exports: {} }
  binary.exports(loaded.exports, createRequire(filename), loaded, filename, path.dirname(filename))
  if (typeof loaded.exports.createPlugin !== 'function') throw Error('Compiled module has no plugin factory')
  return loaded.exports
}
const target=process.platform+'-'+process.arch;const entry=require('./manifest.json').runtime.binaryPlatforms[target];if(!entry)throw Error('Unsupported module platform');module.exports=loadBinaryJavascript(path.join(__dirname,entry));
