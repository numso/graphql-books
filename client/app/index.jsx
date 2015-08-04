/* @flow */

/* $FlowIssue styl */
require('./style.styl')

import React from 'react'
import {Router, Route, Redirect} from 'react-router'
import {history} from 'react-router/lib/HashHistory'

import Main from './main'

import Books from './components/books'
import Book from './components/book'
import BookEdit from './components/book-edit'
import BookNew from './components/book-new'
import CoverFlow from './components/cover-flow'

import Docs from './docs/index'

import Query from './query/index'

var el = document.getElementById('app')
React.render((
  <Router history={history}>
    <Route component={Main}>
      <Route path="books/owned" component={Books}/>
      <Route path="books/wishlist" component={Books}/>
      <Route path="book/new" component={BookNew}/>
      <Route path="book/:id" component={Book}/>
      <Route path="book/:id/edit" component={BookEdit}/>
      <Route path="test" component={CoverFlow}/>

      <Route path="docs" component={Docs}/>

      <Route path="query" component={Query}/>

      <Redirect from="/" to="/docs"/>
    </Route>
  </Router>
), el)
