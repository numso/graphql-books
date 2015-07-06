/* @flow */

import express from 'express'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import config from '../webpack.config'
var hmrPort = 3000
var appPort = 3004

new WebpackDevServer(webpack(config), config.devServer).listen(hmrPort, '0.0.0.0', function (err) {
  if (err) {
    console.log(err)
  }
  console.log('Webpack Dev Server Started on port: ' + hmrPort)
})

var app = express()

app.listen(appPort, err => {
  if (err) {
    console.log(err)
  }
  console.log('App Server listening on port: ' + appPort)
})
