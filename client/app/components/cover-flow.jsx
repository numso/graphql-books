/* @flow */

import React from 'react'

import Shelf from './pieces/shelf'
import Kualay from '../utils/kualay'

var CoverFlow = React.createClass({

  displayName: 'CoverFlow',

  statics: {
    query: `
      query foo {
        ${Shelf.query}
      }
    `
  },

  render(): ReactElement {
    return (
      <div>
        <Shelf data={this.props.data}/>
      </div>
    )
  }

})

export default Kualay.createContainer(CoverFlow)
