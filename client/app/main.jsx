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
        <div>Main Component</div>
        {this.props.children}
      </div>
    )
  }

})
