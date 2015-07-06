/* @flow */

import React from 'react'
import {Router, Route} from 'react-router'
import {history} from 'react-router/lib/HashHistory'

import Main from './main'
import {Books} from './books'

var el = document.getElementById('app')
React.render((
  <Router history={history}>
    <Route path="/" component={Main}>
      <Route path="books" component={Books}/>
    </Route>
  </Router>
), el)
