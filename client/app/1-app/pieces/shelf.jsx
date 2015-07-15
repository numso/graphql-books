/* @flow */

import React from 'react'
import {Link} from 'react-router'
import {map} from 'lodash'

import {Book} from './book'

export class Shelf extends React.Component {

  static displayName = 'Shelf'

  static query = `
    books {
      id
      ${Book.query}
    }
  `

  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  render(): ReactElement {
    var books = this.props.data.books
    return (
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {map(books, book => (
          <Link to={`book/${book.id}`}>
            <Book data={book}/>
          </Link>
        ))}
      </div>
    )
  }

}
