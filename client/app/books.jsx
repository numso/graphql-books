/* @flow */

import React from 'react'

import GraphQL from './graphql'

@GraphQL
export class Books extends React.Component {

  static displayName = 'Books'

  static query = `
    BooksQuery($ownIt: Boolean) {
      books(ownIt: $ownIt) {
        title
      }
    }
  `

  static params = {
    ownIt: true
  }

  render(): ReactElement {
    return (
      <div>Books Container</div>
    )
  }

}
