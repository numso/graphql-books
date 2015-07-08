/* @flow */

import React from 'react'
import {Link} from 'react-router'
import {map} from 'lodash'

import GraphQL from './graphql'

@GraphQL
export class Book extends React.Component {

  static displayName = 'Book'

  static query = `
    query BookQuery($id: String!) {
      book(id: $id) {
        id,
        title,
        description,
        coverUrl,
        author {
          name,
          books {
            id,
            title,
            coverUrl
          }
        }
      }
    }
  `

  static getParams(props) {
    return {
      id: props.params.id
    }
  }

  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  render(): ReactElement {
    var book = this.props.data.book
    var author = book.author || { name: '--', books: []}
    return (
      <div>
        <div style={{display: 'flex'}}>
          <img src={book.coverUrl}/>
          <div style={{paddingLeft: 20}}>
            <div style={{fontSize: 36}}>{book.title}</div>
            <div style={{paddingLeft: 10}}>by {author.name}</div>
            <div style={{paddingTop: 20, paddingLeft: 10}}>{book.description}</div>
          </div>
          <Link to={`book/${book.id}/edit`}>Edit Book</Link>
        </div>
        <div style={{padding: '30px 0', fontSize: 18}}>Other Books by this author:</div>
        <div style={{display: 'flex'}}>
          {map(author.books, _book => (
            <Link to={`book/${_book.id}`}>
              <img style={{width: 100, height: 150, padding: 10}} src={_book.coverUrl}/>
              <div>{_book.title}</div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

}
