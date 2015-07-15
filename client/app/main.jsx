/* @flow */

import React from 'react'
import {Link} from 'react-router'
import {map} from 'lodash'

module.exports = React.createClass({

  displayName: 'Main',

  propTypes: {
    children: React.PropTypes.node
  },

  render(): ReactElement {
    var links = [
      {lbl: 'Owned Books', to: 'books/owned'},
      {lbl: 'Wanted Books', to: 'books/wishlist'},
      {lbl: 'Add New Book', to: 'book/new'}
    ]
    return (
      <div style={{height: '100%'}}>
        <div style={{width: '100%', height: 50, display: 'flex', alignItems: 'center', backgroundColor: 'black', color: 'white'}}>
          <a href="#" style={{color: 'white', textDecoration: 'none', fontSize: 24, padding: '0 20px'}}>Book Keeper</a>
          {map(links, link => (
            <Link to={link.to} style={{padding: '0 8px'}} activeStyle={{backgroundColor: 'grey', color: 'white'}}>{link.lbl}</Link>
          ))}
        </div>
        {this.props.children ? <div style={{width: '90%', marginLeft: '5%'}}>{this.props.children}</div> : <MainMenu/>}
      </div>
    )
  }

})

var MainMenu = React.createClass({

  displayName: 'MainMenu',

  render(): ReactElement {
    var links = [
      {lbl: '0 - Presentation', to: 'preso/1'},
      {lbl: '1 - Books App', to: 'books/owned'},
      {lbl: '2 - API Docs', to: 'docs'},
      {lbl: '3 - Query Page', to: 'query'}
    ]
    return (
      <div>
        {map(links, link => (
          <div style={{fontSize: 36, display: 'flex', justifyContent: 'center'}}>
            <Link to={link.to} style={{marginTop: 30}}>{link.lbl}</Link>
          </div>
        ))}
      </div>
    )
  }

})
