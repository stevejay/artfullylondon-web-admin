'use strict'

const path = require('path')
const AWS_SDK_BUNDLE = 'amazon-cognito-identity-js/dist/aws-cognito-sdk.min.js'

const context = path.join(__dirname, '../src')

module.exports = {
  context,
  module: {
    noParse: /aws-cognito-sdk/,
    rules: [
      {
        enforce: 'pre',
        test: /\.min\.js$/,
        use: [{ loader: 'source-map-loader' }]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: require.resolve(AWS_SDK_BUNDLE),
        use: [{ loader: 'exports-loader?AWSCognito' }]
      },
      {
        test: /\.jpg$/,
        use: [{ loader: 'file-loader' }]
      },
      {
        test: /\.gif$/,
        use: [{ loader: 'url-loader?mimetype=image/png' }]
      },
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        use: [{ loader: 'url-loader?mimetype=application/font-woff' }]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        use: [{ loader: 'file-loader?name=[name].[ext]' }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      _src: path.join(__dirname, '../src'),
      'aws-sdk$': AWS_SDK_BUNDLE
    }
  }
}
