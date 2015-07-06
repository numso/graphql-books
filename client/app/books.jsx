/* @flow */

import React from 'react'

import GraphQL from './graphql'

@GraphQL
export class Books extends React.Component {

  static displayName = 'Books'

  static query = `
    query BooksQuery($ownIt: Boolean) {
      books(ownIt: $ownIt) {
        title,
        author {
          name
        }
      }
    }
  `

  static params = {
    ownIt: true
  }

  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  render(): ReactElement {
    return (
      <div>
        <div>Books Container</div>
        <pre>{JSON.stringify(this.props.data, null, 2)}</pre>
      </div>
    )
  }

}
