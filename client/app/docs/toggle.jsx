/* @flow */

/* $FlowIssue styl */
require('./style.styl')

import React from 'react'

var STYLES = {
  container: height => ({
    height,
    overflow: 'hidden'
  })
}

export default React.createClass({

  displayName: 'Toggle',

  propTypes: {
    toggled: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node
  },

  getInitialState() {
    return { height: 'auto' }
  },

  componentDidMount() {
    this.getHeight()
  },

  getHeight() {
    var node = this.refs.me.getDOMNode()
    var height = getComputedStyle(node).height.replace('px', '')
    this.setState({height})
  },

  render(): ReactElement {
    var height = 0
    if (!this.props.toggled) {
      height = this.state.height
    }
    return (
      <div ref="me"
           className="toggle-me"
           style={STYLES.container(height)}>
        {this.props.children}
      </div>
    )
  }

})
