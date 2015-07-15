/* @flow */

import React from 'react'

module.exports = React.createClass({

  displayName: 'Slide',

  render(): ReactElement {
    return (
      <div className="slide-me" style={{left: this.props.left}}>
        {this.props.children}
      </div>
    )
  }

})
