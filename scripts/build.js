const rollup = require("rollup")
const fs = require("fs-extra")
const path = require("path")
const ts = require("typescript")
const alias = require('rollup-plugin-alias')
const nodeResolve = require("rollup-plugin-node-resolve")
const fileSize = require('rollup-plugin-filesize')
const typescript = require('rollup-plugin-typescript2')

// make sure we're in the right folder
process.chdir(path.resolve(__dirname, ".."))

fs.removeSync("lib")
fs.removeSync(".rpt2_cache")

function buildMiniprogram() {
  const platform = "miniprogram"
  return generateBundledModule(
    platform,
    [path.resolve("lib", "miniapp-canvas.js"),
      path.resolve(platform, 'miniapp-canvas.js')],
    "cjs",
    true
  )
}

function buildWeb() {
  const platform = "web"
  return generateBundledModule(
    platform,
    [path.resolve("lib", "miniapp-canvas.web.js"),
      path.resolve(platform, 'miniapp-canvas.web.js')],
    "cjs"
  )
}

function generateRollupOptions(platform, outputFile, format, declarations = false) {
  const inputFile = path.resolve(`src`, "index.ts")
  const options = {
    declaration: declarations,
    module: 'es2015',
    noEmitHelpers: true,
    noImplicitAny: false
  }

  if (declarations)
    options.declarationDir = path.resolve(".", "lib")

  options.paths = {
    "platforms/*": [`./src/platforms/${platform}/*`]
  }

  const rollupPlugins = [
    nodeResolve(),
    fileSize(),
    typescript({
      tsconfig: "tsconfig.json",
      check: false,
      clean: true,
      tsconfigOverride: {
        compilerOptions: options
      }
    })
  ]

  return {
    inputOptions: {
      input: inputFile,
      plugins: rollupPlugins
    },
    outputOptions: {
      file: outputFile,
      format
    }
  }
}

async function generateBundledModule(platform, outputFiles, format, declarations = false) {
  console.log(`Generating ${[].concat(outputFiles).join(', ')} bundle.`)
  const file = outputFiles.shift();
  const {inputOptions, outputOptions} = generateRollupOptions(platform, file, format, declarations)

  const bundle = await rollup
    .rollup(inputOptions)

  await bundle.write(outputOptions)

  for (const dist of outputFiles) {
    fs.copy(file, dist)
  }

  return bundle
}

function build() {
  // return buildWeb()
  return buildMiniprogram().then(() => buildWeb())
}

function watch() {
  // watchMiniprogram()
  watchWeb()
}

function watchMiniprogram() {
  const platform = "miniprogram"
  const file = path.resolve(platform, 'miniapp-canvas.js')
  const {inputOptions, outputOptions} = generateRollupOptions(platform, file, "cjs", false)
  const watchOptions = {
    ...inputOptions,
    output: [outputOptions],
  }
  rollup.watch(watchOptions);
}

function watchWeb() {
  const platform = "web"
  const file = path.resolve(platform, 'miniapp-canvas.web.js')
  const {inputOptions, outputOptions} = generateRollupOptions(platform, file, "cjs", false)
  const watchOptions = {
    ...inputOptions,
    output: [outputOptions],
  }
  rollup.watch(watchOptions);
}

const args = process.argv.slice(2)
const buildOpts = args[0]
if (buildOpts.includes('build')) {
  build().catch(e => {
    console.error(e)
    if (e.frame) {
      console.error(e.frame)
    }
    process.exit(1)
  })
} else if (buildOpts.includes('watch')) {
  watch()
}

