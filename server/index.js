/* @flow */

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import {graphql} from 'graphql'

import {BooksSchema} from './graphql'

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

app.use(cors())
app.use(bodyParser.json())

app.post('/graphql', (req, res) => {
  var {query, params} = req.body
  graphql(BooksSchema, query, null, params).then(result => {
    res.send(result)
  })
})

app.listen(appPort, err => {
  if (err) {
    console.log(err)
  }
  console.log('App Server listening on port: ' + appPort)
})
