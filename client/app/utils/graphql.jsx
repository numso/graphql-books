/* @flow */

import React from 'react'
import axios from 'axios'
import {noop} from 'lodash'

function performQuery(query, params) {
  return axios.post('http://localhost:3004/graphql', {query, params})
}

module.exports = function (Component: ReactClass): ReactClass {

  return class GraphQLContainer extends React.Component {

    constructor(props) {
      super(props)
      this.state = {loading: true}
      this.getData(props)
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.isTransitioning !== nextProps.isTransitioning) {
        return
      }
      this.setState({loading: true, data: null})
      this.getData(nextProps)
    }

    getData(props) {
      performQuery(Component.query, (Component.getParams || noop)(props))
        .then(resp => {
          this.setState({
            loading: false,
            data: resp.data.data,
            errors: resp.data.errors
          })
        })
    }

    render() {
      if (this.state.loading) {
        return <div>Loading...</div>
      }
      return <Component {...this.props} data={this.state.data} errors={this.state.errors} query={Component.query}/>
    }

  }

}
