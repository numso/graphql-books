/* @flow */

// http://facebook.github.io/react/blog/2015/05/01/graphql-introduction.html

import React from 'react'
import {map} from 'lodash'

module.exports = React.createClass({

  displayName: 'Slide3',

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
    if (num > -1 && num < 8) {
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
    var items = [
      'Hierarchical',
      'Product-centric',
      'Structured, Arbitrary Code',
      'Client-specified queries',
      'Application-Layer Protocol',
      'Backwards Compatible',
      'Strongly-typed',
      'Introspective'
    ]
    var imgs = [
      'img/relay.png',
      'img/structure.png',
      'img/structure.png',
      'img/query.png',
      'img/architecture.png',
      'img/architecture.png',
      'img/no_bugs.jpg',
      'img/typeahead.png'
    ]
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <h1>A Solution</h1>
        <div style={{display: 'flex', flex: 1, width: '100%'}}>
          <ul style={{fontSize: 24, paddingRight: 50}}>
            {map(items, (item, i) => <li className="fade-me" style={{fontWeight: this.state.num === i ? 'bold' : 'inherit', opacity: this.state.num < i ? 0 : 1}}>{item}</li>)}
          </ul>
          <div style={{position: 'relative', flex: 1}}>
            {map(imgs, (img, i) => (
              <div style={{position: 'absolute', top: 0, left: 0}}>
                <img className="fade-me" style={{maxWidth: '100%', maxHeight: '100%', opacity: this.state.num === i ? 1 : 0}} src={img}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

})
