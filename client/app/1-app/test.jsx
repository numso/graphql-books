/* @flow */

import React from 'react'

import GraphQL from '../utils/graphql'

@GraphQL
export class Test extends React.Component {

  static displayName = 'Test'

  static query = `
    query empty {
    }
  `

  static propTypes = {
    data: React.PropTypes.object.isRequired
  }

  render(): ReactElement {
    var data = this.props.data
    return (
      <div>
        Test Page
      </div>
    )
  }

}
