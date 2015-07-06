/* @flow */

import React from 'react'
import axios from 'axios'

function performQuery(query, params) {
  return axios.post('http://localhost:3004/graphql', {query, params})
}

module.exports = function (Component: ReactClass): ReactClass {

  return class GraphQLContainer extends React.Component {

    constructor(props) {
      super(props)
      this.state = {loading: true}
      performQuery(Component.query, Component.params)
        .then(resp => {
          this.setState({
            loading: false,
            data: resp.data
          })
        })
    }

    render() {
      if (this.state.loading) {
        return <div>Loading...</div>
      }
      return <Component data={this.state.data}/>
    }

  }

}