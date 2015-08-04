/* @flow */

import React from 'react'

import type {Book} from '../../../../server/types'

type Props = {
  data: $Shape<Book>;
};

export default React.createClass({

  displayName: 'Book',

  statics: {
    query: `
      title,
      coverUrl
    `
  },

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  render(): ReactElement {
    var props: Props = this.props
    var book = props.data
    return (
      <div style={{padding: '0 20px', textAlign: 'center'}}>
        <img style={{width: 100, height: 150}} src={book.coverUrl}/>
        <div>{book.title}</div>
      </div>
    )
  }

})
