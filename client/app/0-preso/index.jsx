/* @flow */

import React from 'react'
import {map} from 'lodash'

import Slide from './slide'

import Slide1 from './slide-1'
import Slide2 from './slide-2'
import Slide3 from './slide-3'
import Slide4 from './slide-4'
import Slide5 from './slide-5'

var components = [Slide1, Slide2, Slide3, Slide4, Slide5]

export var Presentation = React.createClass({

  displayName: 'Presentation',

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  animate(e) {
    var num = +this.props.params.num
    var newNum = num
    if (e.keyCode === 37) {
      newNum = num - 1
    }
    if (e.keyCode === 39) {
      newNum = num + 1
    }
    if (newNum !== num && newNum > 0 && newNum < 6) {
      this.context.router.transitionTo(`preso/${newNum}`)
    }
  },

  componentDidMount() {
    document.addEventListener('keydown', this.animate)
  },

  componentWillUnmount() {
    document.removeEventListener('keydown', this.animate)
  },

  render(): ReactElement {
    var num = this.props.params.num - 1
    return (
      <div className="preso" style={{height: '100%', position: 'relative', overflow: 'hidden'}}>
        {map(components, (Component, i) => (
          <Slide left={(i - num) * 100 + '%'}>
            <Component isActive={i == num}/>
          </Slide>
        ))}
      </div>
    )
  }

})
