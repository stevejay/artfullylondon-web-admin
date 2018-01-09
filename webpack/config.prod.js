'use strict'

const merge = require('lodash.merge')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const configBase = require('./webpack.config.base')
const path = require('path')

module.exports = merge(configBase, {
  entry: {
    vendor: [
      // NOTE: Don't put react-icons in here
      'amazon-cognito-identity-js',
      'aws-sdk',
      'backo',
      'fetch-ponyfill',
      'global',
      'jsbn',
      'lodash',
      'lodash-uuid',
      'moment',
      'moment-timezone',
      // 'node-event-emitter',
      'normalise-request',
      'react',
      'react-transition-group',
      'react-day-picker',
      'react-dom',
      'react-google-maps',
      'react-image-gallery',
      'react-lazyload',
      'react-overlays',
      'react-redux',
      'react-router',
      'react-rte',
      'react-select',
      'recompose',
      'redux',
      'redux-actions',
      'redux-form',
      'redux-saga',
      'sjcl',
      'smart-outline',
      'store',
      'ensure-request'
    ],
    app: ['babel-polyfill', './index.jsx']
  },

  output: {
    path: path.join(__dirname, '../build'),
    filename: './static/[name].[chunkhash].js',
    chunkFilename: './static/[name].[chunkhash].js',
    sourcePrefix: '  '
  },

  module: {
    noParse: configBase.module.noParse,
    rules: configBase.module.rules.concat([
      {
        enforce: 'pre',
        test: /\.(css|scss|sass)$/,
        loader: 'stripcomment-loader'
      },
      {
        test: /\.(m|jsx)\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, '../src')]
              }
            }
          ]
        })
      },
      {
        test: /\.s?css$/,
        exclude: /\.(m|jsx)\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader?importLoaders=1'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.resolve(__dirname, '../src')]
              }
            }
          ]
        })
      }
    ])
  },

  plugins: [
    new LodashModuleReplacementPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /_src\/debug\/dev-tools/,
      '_src/debug/dev-tools.prod.js'
    ),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      options: { context: __dirname }
    }),
    new ExtractTextPlugin({
      filename: 'static/[contenthash].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      title: 'Artfully London Admin',
      template: '../src/template.html',
      inject: false,
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      chunksSortMode: 'dependency'
    }),
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        ARTFULLY_LONDON_API_URL: JSON.stringify('https://api.artfully.london'),
        ARTFULLY_LONDON_GOOGLEMAPS_API_KEY: JSON.stringify(
          'AIzaSyCJ5v8gMZogBs0s05DUZH7uXappMIOnHGI'
        ),
        ARTFULLY_LONDON_GOOGLEMAPS_STATIC_API_KEY: JSON.stringify(
          'AIzaSyCJ5v8gMZogBs0s05DUZH7uXappMIOnHGI'
        ),
        ARTFULLY_LONDON_ENTITY_IMAGES_ROOT_URL: JSON.stringify(
          'https://images.artfully.london'
        ),
        ARTFULLY_LONDON_SITE_IMAGES_ROOT_URL: JSON.stringify(
          'https://siteimages.artfully.london'
        ),
        ARTFULLY_LONDON_COGNITO_USER_POOL_ID: JSON.stringify(
          'eu-west-1_5r1v2mFTN'
        ),
        ARTFULLY_LONDON_COGNITO_USER_POOL_APP_CLIENT_ID: JSON.stringify(
          '2gup926p48904so9of47h1iscf'
        )
      }
    }),
    new CopyWebpackPlugin([
      { from: '../static/robots.txt' },
      { from: '../static/favicon', to: 'favicon' }
    ])
  ]
})
