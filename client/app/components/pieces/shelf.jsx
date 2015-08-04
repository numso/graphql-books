/* @flow */

import React from 'react'
import {Link} from 'react-router'
import {map} from 'lodash'

import Book from './book'

import type {Book as BookT} from '../../../../server/types'

type Props = {
  data: {
    books: Array<$Shape<BookT>>;
  };
};

export default React.createClass({

  displayName: 'Shelf',

  statics: {
    query: `
      books {
        id
        ${Book.query}
      }
    `
  },

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  render(): ReactElement {
    var props: Props = this.props
    var {books} = props.data
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

})
