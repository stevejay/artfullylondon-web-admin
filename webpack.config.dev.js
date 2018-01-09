'use strict'

const merge = require('lodash.merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const configBase = require('./webpack.config.base')
const path = require('path')

module.exports = merge(configBase, {
  entry: {
    app: ['babel-polyfill', './index.jsx', 'webpack-hot-middleware/client']
  },

  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].js',
    publicPath: '/'
  },

  module: {
    noParse: configBase.module.noParse,
    rules: configBase.module.rules.concat([
      {
        test: /\.(m|jsx)\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[path][name]__[local]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [require('autoprefixer')]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.resolve(__dirname, './src')]
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        exclude: /\.(m|jsx)\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: () => [require('autoprefixer')]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [path.resolve(__dirname, './src')]
            }
          }
        ]
      }
    ])
  },

  devtool: '#cheap-module-eval-source-map',

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: { context: __dirname }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Artfully London Admin',
      template: './template.html',
      hash: true,
      inject: false
    }),
    new CopyWebpackPlugin([
      {
        from: '../static/favicon/favicon.ico',
        to: 'favicon/favicon.ico'
      }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
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
    })
  ]
})
