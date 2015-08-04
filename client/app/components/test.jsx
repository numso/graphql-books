/* @flow */

import React from 'react'

import Shelf from './pieces/shelf'
import Kualay from '../utils/kualay'

import type {Book} from '../../../server/types'

type Props = {
  data: {
    books: Array<Book>;
  };
};

var Test = React.createClass({

  displayName: 'Test',

  statics: {
    query: `
      query empty {
        ${Shelf.query}
      }
    `
  },

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  render(): ReactElement {
    var props: Props = this.props
    return (
      <div>
        <Shelf data={props.data}/>
      </div>
    )
  }

})

export default Kualay.createContainer(Test)
