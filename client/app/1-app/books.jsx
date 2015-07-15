/* @flow */

import React from 'react'
import {includes, map} from 'lodash'

import GraphQL from '../utils/graphql'

@GraphQL
export class Books extends React.Component {

  static displayName = 'Books'

  static query = `
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
  `

  static getParams(props) {
    return {
      ownIt: includes(['books/owned', '/books/owned'], props.location.pathname)
    }
  }

  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render(): ReactElement {
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
            {map(this.props.data.books, book => (
              <tr style={{cursor: 'pointer'}} onClick={() => this.context.router.transitionTo(`book/${book.id}`)}>
                <td>{book.title}</td>
                <td>{(book.author || {}).name || '--'}</td>
                <td>{book.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

}
