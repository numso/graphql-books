/* @flow */

import React from 'react'

module.exports = React.createClass({

  displayName: 'Main',

  propTypes: {
    children: React.PropTypes.node
  },

  render(): ReactElement {
    return (
      <div>
        <div style={{width: '100%', height: 50, display: 'flex', alignItems: 'center', backgroundColor: 'black', color: 'white'}}>
          <div style={{fontSize: 24, padding: '0 20px'}}>Book Keeper</div>
          <a href="/#/books" style={{paddingLeft: 16}}>Owned Books</a>
          <a href="/#/books/wishlist" style={{paddingLeft: 16}}>Wanted Books</a>
        </div>
        {this.props.children || 'not loaded'}
      </div>
    )
  }

})
