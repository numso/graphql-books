/* @flow */

import React from 'react'

module.exports = React.createClass({

  displayName: 'Slide2',

  getInitialState() {
    return {
      num: 0
    }
  },

  animate(e) {
    if (!this.props.isActive) {
      return
    }
    var num = this.state.num
    if (e.keyCode === 38) {
      num--
    }
    if (e.keyCode === 40) {
      num++
    }
    if (num > -1 && num < 3) {
      this.setState({num})
    }
  },

  componentDidMount() {
    document.addEventListener('keydown', this.animate)
  },

  componentWillUnmount() {
    document.removeEventListener('keydown', this.animate)
  },

  render(): ReactElement {
    var opacity = this.state.num === 0 ? 0 : 1
    var showBullets = this.state.num === 2 ? 1 : 0
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <h1>The Problem</h1>
        <div style={{height: '100%', width: '100%'}}>
          <img src="img/screen.png" style={{position: 'absolute', maxHeight: '100%', maxWidth: '100%'}}/>
          <img className="fade-me" src="img/screen-m.png" style={{position: 'absolute', maxHeight: '100%', maxWidth: '100%', opacity}}/>
          <div className="fade-me" style={{position: 'absolute', opacity: showBullets, backgroundColor: 'rgba(128,128,255,0.8)', display: 'inline-block', padding: 25, right: 50, top: 250, fontSize: 24}}>
            <ul>
              <li>Need to version your APIs</li>
              <li>New Features require a lot of code change</li>
              <li>Joining can be a pain</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

})
