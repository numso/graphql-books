/* @flow */

import React from 'react'
import {filter} from 'lodash'

import GraphQL from './graphql'

@GraphQL
export class Test extends React.Component {

  static displayName = 'Test'

  static query = `
    query TestQuery {
      __schema {
        types {
          name,
          description,
          kind,
          fields {
            name,
            type {
              kind
            },
            description
          }
        }
      }
    }
  `

  static getParams(props) {
    return {}
  }

  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  render(): ReactElement {
    return (
      <pre>
        {JSON.stringify(this.props.data, null, 2)}
      </pre>
    )
  }

}
