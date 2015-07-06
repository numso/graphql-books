/* @flow */

import webpack from 'webpack'

module.exports = {

  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^react$/, 'react/addons'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/vertx/)
  ],

  entry: {
    'bundle.js': [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/dev-server',
      './client/app/index.jsx'
    ]
  },

  output: {
    path: __dirname + '/client/build/',
    filename: '[name]',
    publicPath: '/build/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', 'index.js', 'index.jsx', '.styl']
  },

  module: {
    preLoaders: [
      { test: /\.json$/, loader: 'json'}
    ],
    loaders: [
      { test: /\.jsx$/, loader: 'react-hot!babel?stage=0', exclude: [/node_modules/] },
      { test: /\.js$/, loader: 'babel?stage=0', exclude: [/node_modules/] },
      { test: /\.styl$/, loader: 'style!css!stylus' },
      { test: /\.css$/, loader: 'style!css' }
    ]
  },

  externals: {
    APIHOST: '"/api"'
  },

  devServer: {
    publicPath: '/build/',
    contentBase: 'client/',
    hot: true,
    quiet: true
  },

  devtool: '#eval'

}
