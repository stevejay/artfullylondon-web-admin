'use strict'
const browserSync = require('browser-sync')
const history = require('connect-history-api-fallback')
const webpack = require('webpack')
const webpackDev = require('webpack-dev-middleware')
const webpackHot = require('webpack-hot-middleware')
const config = require('./webpack.config')

const compiler = webpack(config)
const DEFAULT_PORT = 3000

browserSync({
  port: process.env.PORT || DEFAULT_PORT,
  ui: { port: process.env.UI_PORT || DEFAULT_PORT + 1 },
  https: true,
  server: {
    baseDir: '.',
    middleware: [
      history({
        rewrites: [
          {
            from: /^\/favicon\/.*$/,
            to: function (context) {
              return '/static' + context.parsedUrl.pathname
            }
          }
        ]
      }),
      webpackDev(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
        stats: { colors: true }
      }),
      webpackHot(compiler)

      // (req, res, next) => {
      //   const requestURL = url.parse(req.url)
      //   const pathname = requestURL.pathname
      //   const exists = fs.existsSync(path.resolve(BUILD, pathname))

      //   if (!exists) {
      //     req.url = '/index.html'
      //   }

      //   return next()
      // }
    ]
  },
  files: ['src/*.html']
})
