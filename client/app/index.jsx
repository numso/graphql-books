/* @flow */

import React from 'react'
import {Router, Route} from 'react-router'
import {history} from 'react-router/lib/HashHistory'

import Main from './main'
import {Books} from './books'
import {Book} from './book'
import {BookEdit} from './book-edit'
import {BookNew} from './book-new'

var el = document.getElementById('app')
React.render((
  <Router history={history}>
    <Route path="/" component={Main}>
      <Route path="books" component={Books}/>
      <Route path="books/wishlist" component={Books}/>
      <Route path="book/new" component={BookNew}/>
      <Route path="book/:id" component={Book}/>
      <Route path="book/:id/edit" component={BookEdit}/>
    </Route>
  </Router>
), el)
