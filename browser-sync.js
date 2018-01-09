'use strict'

const browserSync = require('browser-sync')
const history = require('connect-history-api-fallback')
const webpack = require('webpack')
const webpackDev = require('webpack-dev-middleware')
const webpackHot = require('webpack-hot-middleware')
// const httpProxy = require('http-proxy');

const config = require('./webpack.config.dev')
const compiler = webpack(config)

// const proxy = httpProxy.createProxyServer({
//   changeOrigin: true,
//   target: 'https://api.artfully.london',
// });

browserSync({
  port: process.env.PORT || 3000,
  ui: { port: process.env.UI_PORT || 3001 },
  https: true,
  server: {
    baseDir: '.',
    middleware: [
      // function(req, res, next) {
      //   if (req.url.startsWith('/api/')) {
      //     proxy.web(req, res);
      //   } else {
      //     next();
      //   }
      // },
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
