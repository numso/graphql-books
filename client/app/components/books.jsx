/* @flow */

import React from 'react'
import {includes, map} from 'lodash'

import Kualay from '../utils/kualay'

import type {Book} from '../../../server/types'

type Props = {
  location: {
    pathname: string;
  };
  data: {
    books: Array<Book>;
  };
};

var Books = React.createClass({

  displayName: 'Books',

  statics: {
    query: `
      query BooksQuery($ownIt: Boolean) {
        books(ownIt: $ownIt) {
          id,
          title,
          description,
          author {
            name
          }
        }
      }
    `,
    getParams(props: Props) {
      return {
        ownIt: includes(['books/owned', '/books/owned'], props.location.pathname)
      }
    }
  },

  propTypes: {
    location: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  render(): ReactElement {
    var props: Props = this.props
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {map(props.data.books, book => (
              <tr style={{cursor: 'pointer'}} onClick={() => this.context.router.transitionTo(`book/${book.id}`)}>
                <td>{book.title}</td>
                <td>{(book.author || {}).name || '--'}</td>
                <td style={{maxWidth: 500}}>{book.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

})

export default Kualay.createContainer(Books)
