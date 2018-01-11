'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UnusedWebpackPlugin = require('unused-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const PRODUCTION = NODE_ENV === 'production'
const AWS_SDK_BUNDLE = 'amazon-cognito-identity-js/dist/aws-cognito-sdk.min.js'
const SRC_DIR = path.join(__dirname, './src')

const ENTRY = PRODUCTION
  ? {
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
      'ensure-request'
    ],
    app: ['babel-polyfill', './index.jsx']
  }
  : {
    app: [
      'babel-polyfill',
      './index.jsx',
      './foo.scss',
      'webpack-hot-middleware/client'
    ]
  }

const OUTPUT = PRODUCTION
  ? {
    path: path.join(__dirname, './build'),
    filename: './static/[name].[chunkhash].js',
    chunkFilename: './static/[name].[chunkhash].js',
    sourcePrefix: '  '
  }
  : {
    path: path.join(__dirname, 'static'),
    filename: '[name].js',
    publicPath: '/'
  }

let PLUGINS = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
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
  new webpack.LoaderOptionsPlugin({
    minimize: PRODUCTION,
    options: { context: __dirname }
  }),
  new ExtractTextPlugin({
    disable: !PRODUCTION,
    filename: 'static/[contenthash].css',
    allChunks: true
  }),
  new HtmlWebpackPlugin({
    title: 'Artfully London Admin',
    template: './template.html',
    inject: false,
    hash: false,
    minify: PRODUCTION
      ? {
        collapseWhitespace: true,
        removeComments: true
      }
      : false,
    chunksSortMode: 'dependency'
  })
]

if (PRODUCTION) {
  PLUGINS = PLUGINS.concat([
    new LodashModuleReplacementPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /_src\/debug\/dev-tools/,
      '_src/debug/dev-tools.prod.js'
    ),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
      sourceMap: false
    }),
    new CopyWebpackPlugin([
      { from: '../static/robots.txt' },
      { from: '../static/favicon', to: 'favicon' }
    ])
  ])
} else {
  PLUGINS = PLUGINS.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        from: '../static/favicon/favicon.ico',
        to: 'favicon/favicon.ico'
      }
    ]),
    new UnusedWebpackPlugin({
      directories: [SRC_DIR],
      exclude: ['.DS_Store']
    })
  ])
}

function sassLoader (useModules) {
  const CSS_MODULE_FILES_REGEX = /src[\\/](components|containers|modules)[\\/]/

  const opts = useModules
    ? { include: CSS_MODULE_FILES_REGEX }
    : { exclude: CSS_MODULE_FILES_REGEX }

  return {
    test: /\.s?css$/,
    ...opts,
    use: ExtractTextPlugin.extract({
      fallback: {
        loader: 'style-loader',
        options: { sourceMap: !PRODUCTION }
      },
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: !PRODUCTION,
            importLoaders: 1,
            minimize: PRODUCTION,
            modules: useModules,
            localIdentName: PRODUCTION
              ? '[name]_[local]_[hash:base64:5]'
              : '[path][name]__[local]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: !PRODUCTION,
            plugins: () => [require('autoprefixer')]
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: !PRODUCTION,
            includePaths: [SRC_DIR]
          }
        }
      ]
    })
  }
}

module.exports = {
  context: SRC_DIR,
  entry: ENTRY,
  output: OUTPUT,
  module: {
    noParse: /aws-cognito-sdk/,
    rules: [
      {
        enforce: 'pre',
        test: { and: [/\.min\.js$/, () => !PRODUCTION] },
        use: [{ loader: 'source-map-loader' }]
      },
      {
        enforce: 'pre',
        test: { and: [/\.(css|scss|sass)$/, () => PRODUCTION] },
        loader: 'stripcomment-loader'
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
        use: [
          {
            loader: 'url-loader',
            options: { mimetype: 'image/png' }
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: { mimetype: 'application/font-woff' }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: '[name].[ext]' }
          }
        ]
      },
      sassLoader(true),
      sassLoader(false)
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      _src: SRC_DIR,
      'aws-sdk$': AWS_SDK_BUNDLE
    }
  },
  devtool: PRODUCTION ? false : '#cheap-module-eval-source-map',
  plugins: PLUGINS
}
