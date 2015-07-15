/* @flow */

import React from 'react'
import {Link} from 'react-router'

import {Shelf} from './pieces/shelf'
import GraphQL from '../utils/graphql'

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
          ${Shelf.query}
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
        <div style={{display: 'flex', position: 'relative', marginTop: 30}}>
          <div>
            <img src={book.coverUrl} style={{maxWidth: 200, maxHeight: 320}}/>
          </div>
          <div style={{paddingLeft: 20}}>
            <div style={{fontSize: 36}}>{book.title}</div>
            <div style={{paddingLeft: 10}}>by {author.name}</div>
            <div style={{paddingTop: 20, paddingLeft: 10}}>{book.description}</div>
          </div>
          <Link style={{position: 'absolute', top: 10, right: 30}} to={`book/${book.id}/edit`}>Edit Book</Link>
        </div>
        <div style={{padding: '30px 0', fontSize: 18}}>Other Books by this author:</div>
        <Shelf data={author}/>
      </div>
    )
  }

}
