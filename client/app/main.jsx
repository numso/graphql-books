/* @flow */

import React from 'react'
import {Link} from 'react-router'
import {map} from 'lodash'

type AppLink = {
  lbl: string;
  to: string;
}

var STYLES = {
  container: {
    height: '100%'
  },
  topBar: {
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    color: 'white',
    padding: '0 5%'
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center'
  },
  mainLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: 24,
    paddingRight: 20
  },
  link: {
    padding: '2px 8px'
  },
  activeLink: {
    backgroundColor: 'grey',
    color: 'white'
  },
  childContent: {
    width: '90%',
    marginLeft: '5%'
  }
}

module.exports = React.createClass({

  displayName: 'Main',

  propTypes: {
    children: React.PropTypes.node
  },

  renderLink(link: AppLink): ReactElement {
    return (
      <Link to={link.to}
            style={STYLES.link}
            activeStyle={STYLES.activeLink}>
        {link.lbl}
      </Link>
    )
  },

  render(): ReactElement {
    var leftLinks: Array<AppLink> = [
      {lbl: 'Owned Books', to: 'books/owned'},
      {lbl: 'Wanted Books', to: 'books/wishlist'},
      {lbl: 'Add New Book', to: 'book/new'}
    ]
    var rightLinks: Array<AppLink> = [
      {lbl: 'Docs', to: 'docs'},
      {lbl: 'Query', to: 'query'}
    ]
    return (
      <div style={STYLES.container}>
        <div style={STYLES.topBar}>
          <div style={STYLES.leftSection}>
            <a href="#" style={STYLES.mainLink}>Book Keeper</a>
            {map(leftLinks, this.renderLink)}
          </div>
          <div>
            {map(rightLinks, this.renderLink)}
          </div>
        </div>
        <div style={STYLES.childContent}>
          {this.props.children ? this.props.children : ':('}
        </div>
      </div>
    )
  }

})
