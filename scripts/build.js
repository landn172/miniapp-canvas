const rollup = require("rollup")
const fs = require("fs-extra")
const path = require("path")
const ts = require("typescript")

// make sure we're in the right folder
process.chdir(path.resolve(__dirname, ".."))

const binFolder = path.resolve("node_modules/.bin/")

fs.removeSync("lib")
fs.removeSync(".build.cjs")
fs.removeSync(".build.es")

function runTypeScriptBuild(outDir, target, declarations) {
  console.log(`Running typescript build (target: ${ts.ScriptTarget[target]}) in ${outDir}/`)

  const tsConfig = path.resolve("tsconfig.json")
  const json = ts.parseConfigFileTextToJson(tsConfig, ts.sys.readFile(tsConfig), true)

  const {options} = ts.parseJsonConfigFileContent(json.config, ts.sys, path.dirname(tsConfig))

  options.target = target
  options.outDir = outDir
  options.declaration = declarations

  options.module = ts.ModuleKind.ES2015
  options.importHelpers = true
  options.noEmitHelpers = true
  if (declarations)
    options.declarationDir = path.resolve(".", "lib")

  const rootFile = path.resolve("src", "index.ts")
  const host = ts.createCompilerHost(options, true)
  const prog = ts.createProgram([rootFile], options, host)
  const result = prog.emit()
  if (result.emitSkipped) {
    const message = result.diagnostics
      .map(
        d => `${ts.DiagnosticCategory[d.category]} ${d.code} (${d.file}:${d.start}): ${
          d.messageText
          }`
    )
      .join("\n")

    throw new Error(`Failed to compile typescript:

${message}`)
  }
}

const rollupPlugins = [require("rollup-plugin-node-resolve")(), require("rollup-plugin-filesize")()]

function generateBundledModule(inputFile, outputFiles, format) {
  console.log(`Generating ${[].concat(outputFiles).join(', ')} bundle.`)

  return rollup
    .rollup({
      entry: inputFile,
      plugins: rollupPlugins
    })
    .then(bundle => Promise.all([].concat(outputFiles)
      .map(outputFile => writeDist(bundle, outputFile))
    ))

  function writeDist(bundle, outputFile) {
    return bundle.write({
      file: outputFile,
      format
    })
  }
}

function build() {
  runTypeScriptBuild(".build.es5", ts.ScriptTarget.ES5, true)
  runTypeScriptBuild(".build.es6", ts.ScriptTarget.ES2015, false)
  return Promise.all([
    generateBundledModule(
      path.resolve(".build.es5", "index.js"),
      [path.resolve("lib", "miniapp-canvas.js"),
        path.resolve('miniprogram', 'miniapp-canvas.js')],
      "cjs"
    ),

    generateBundledModule(
      path.resolve(".build.es5", "index.js"),
      path.resolve("lib", "miniapp-canvas.module.js"),
      "es"
    ),

    generateBundledModule(
      path.resolve(".build.es6", "index.js"),
      path.resolve("lib", "miniapp-canvas.es6.js"),
      "es"
    )
  ]).then(() => {
  })
}

build().catch(e => {
  console.error(e)
  if (e.frame) {
    console.error(e.frame)
  }
  process.exit(1)
})
