/* @flow */

import React from 'react'
import {map} from 'lodash'

import GraphQL from './graphql'

@GraphQL
export class Book extends React.Component {

  static displayName = 'Book'

  static query = `
    query BookQuery($id: String!) {
      book(id: $id) {
        title,
        description,
        coverUrl,
        author {
          name,
          books {
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
    return (
      <div>
        <div style={{display: 'flex'}}>
          <img src={this.props.data.book.coverUrl}/>
          <div style={{paddingLeft: 20}}>
            <div style={{fontSize: 36}}>{this.props.data.book.title}</div>
            <div style={{paddingLeft: 10}}>by {this.props.data.book.author.name}</div>
            <div style={{paddingTop: 20, paddingLeft: 10}}>{this.props.data.book.description}</div>
          </div>
        </div>
        <div style={{padding: '30px 0', fontSize: 18}}>Other Books by this author:</div>
        <div style={{display: 'flex'}}>
          {map(this.props.data.book.author.books, book => (
            <div>
              <img style={{width: 100, height: 150, padding: 10}} src={book.coverUrl}/>
              <div>{book.title}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }

}
