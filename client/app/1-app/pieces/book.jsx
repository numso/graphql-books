/* @flow */

import React from 'react'

export class Book extends React.Component {

  static displayName = 'Book'

  static query = `
    title,
    coverUrl
  `

  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  render(): ReactElement {
    var book = this.props.data
    return (
      <div style={{padding: '0 20px', textAlign: 'center'}}>
        <img style={{width: 100, height: 150}} src={book.coverUrl}/>
        <div>{book.title}</div>
      </div>
    )
  }

}
