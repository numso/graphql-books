/* @flow */

import React from 'react'
import axios from 'axios'
import {noop} from 'lodash'

function performQuery(query, params) {
  return axios.post('http://localhost:3004/graphql', {query, params})
}

var createContainer = function (Component: any): ReactClass {

  return React.createClass({

    displayName: 'KualayContainer',

    propTypes: {
      isTransitioning: React.PropTypes.bool
    },

    getInitialState() {
      return { loading: true }
    },

    componentWillMount() {
      this.getData(this.props)
    },

    componentWillReceiveProps(nextProps) {
      if (this.props.isTransitioning !== nextProps.isTransitioning) {
        return
      }
      this.setState({loading: true, data: null})
      this.getData(nextProps)
    },

    getData(props) {
      performQuery(Component.query, (Component.getParams || noop)(props))
        .then(resp => {
          this.setState({
            loading: false,
            data: resp.data.data,
            errors: resp.data.errors
          })
        })
    },

    mutate(key, params) {
      var query = Component.mutations[key]
      return performQuery(query, params)
    },

    render() {
      if (this.state.loading || !this.state.data) {
        return <div>Loading...</div>
      }
      return <Component {...this.props} data={this.state.data} mutate={this.mutate} errors={this.state.errors} query={Component.query}/>
    }

  })

}

export default {createContainer}
