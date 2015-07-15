/* @flow */

require('./animate.styl')

import React from 'react'
import {Router, Route} from 'react-router'
import {history} from 'react-router/lib/HashHistory'

import Main from './main'

import {Presentation} from './0-preso/index'

import {Books} from './1-app/books'
import {Book} from './1-app/book'
import {BookEdit} from './1-app/book-edit'
import {BookNew} from './1-app/book-new'
import {Test} from './1-app/test'

import {Docs} from './2-docs/index'

import {Query} from './3-query/index'

var el = document.getElementById('app')
React.render((
  <Router history={history}>
    <Route path="/preso/:num" component={Presentation}/>
    <Route path="/" component={Main}>

      <Route path="books/owned" component={Books}/>
      <Route path="books/wishlist" component={Books}/>
      <Route path="book/new" component={BookNew}/>
      <Route path="book/:id" component={Book}/>
      <Route path="book/:id/edit" component={BookEdit}/>
      <Route path="test" component={Test}/>

      <Route path="docs" component={Docs}/>

      <Route path="query" component={Query}/>
    </Route>
  </Router>
), el)
