/* eslint-env node */

const path = require('path')
const merge = require('webpack-merge')

const {
  setupIO,
  setupDevServer,
  loadHTML,
  loadCSS,
  loadJS,
  loadMacro,
  loadMedia,
  loadFont,
  minify,
  forceCaseSensitivePath,
  generateSourceMaps,
  cleanupBuilds,
} = require('webpack-config-parts')

const BASE_DIR = __dirname
const ENTRY = path.join(BASE_DIR, 'src/index.js')
const DIST_DIR = path.join(BASE_DIR, 'dist')

const commonConfig = merge([
  {
    resolve: {
      alias: {
        Assets: path.resolve(__dirname, 'src/assets/'),
        Framework: path.resolve(__dirname, 'src/framework'),
      },
    },
  },
  loadHTML(),
  loadJS({
    include: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules/black'),
    ],
  }),
  loadMacro(),
  loadMedia(),
  loadFont(),
  forceCaseSensitivePath(),
])

const developmentConfig = () =>
  merge([
    setupIO({
      entry: ENTRY,
      outputDIR: DIST_DIR,
    }),
    setupDevServer(),
    commonConfig,
    loadCSS({ production: false }),
    generateSourceMaps({ production: false }),
  ])

const productionConfig = () =>
  merge([
    minify(),
    setupIO({
      entry: ENTRY,
      outputDIR: DIST_DIR,
      production: true,
    }),
    commonConfig,
    loadCSS({ production: true }),
    generateSourceMaps({ production: true }),
    cleanupBuilds(DIST_DIR, { root: BASE_DIR }),
  ])

/* eslint-disable-next-line */
module.exports = function(_, { mode } = { mode: 'NO_MODE' }) {
  const config =
    mode === 'production' ? productionConfig() : developmentConfig()

  return config
}
