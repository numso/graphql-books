/* @flow */

import React from 'react'

module.exports = React.createClass({

  displayName: 'Slide1',

  render(): ReactElement {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <h1>GraphQL</h1>
        <img src="img/logo.png" style={{width: 300}}/>
      </div>
    )
  }

})
