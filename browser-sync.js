'use strict'
const browserSync = require('browser-sync')
const history = require('connect-history-api-fallback')
const webpack = require('webpack')
const webpackDev = require('webpack-dev-middleware')
const webpackHot = require('webpack-hot-middleware')
const config = require('./webpack.config')

const compiler = webpack(config)

browserSync({
  port: process.env.PORT || 3000,
  ui: { port: process.env.UI_PORT || 3001 },
  https: true,
  server: {
    baseDir: '.',
    middleware: [
      webpackDev(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
        stats: { colors: true }
      }),
      webpackHot(compiler),
      history({
        rewrites: [
          {
            from: /^\/favicon\/.*$/,
            to: function (context) {
              return '/static' + context.parsedUrl.pathname
            }
          }
        ]
      })
    ]
  },
  files: ['src/*.html']
})
