/* @flow */

import React from 'react'

module.exports = React.createClass({

  displayName: 'Slide4',

  render(): ReactElement {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <h1>Demo Time</h1>
        <img src="img/demo.gif"/>
      </div>
    )
  }

})
