/* @flow */

import React from 'react'
import {Panel} from 'react-bootstrap'
import {map} from 'lodash'

import GraphQL from '../utils/graphql'

var types = ['Query', 'Mutation', 'Book', 'Author']
var queryParts = map(types, t => `
  ${t}: __type(name: "${t}") {
    ...typeFields
  }
`).join('')

function getType(field) {
  if (field.type.kind == 'LIST') {
    return <span>Array&lt;{l.call(this, field.type.ofType.name)}&gt;</span>
  }
  if (field.type.kind == 'NON_NULL') {
    return <span>{l.call(this, field.type.ofType.name)}*</span>
  }
  return <span>{l.call(this, field.type.name)}</span>
}

function l(name) {
  if (name === 'Book' || name === 'Author') {
    return <a style={{cursor: 'pointer'}} onClick={() => smoothScrollTo.call(this, name)}>{name}</a>
  }
  return name
}

function easeInOutQuad(t, b, c, d) {
  t /= d / 2
  if (t < 1) {
    return c / 2 * t * t + b
  }
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

var time = 0
function smoothScrollTo(name) {
  this.setState({['hide-' + name]: false})
  var el = document.getElementById(name)
  requestAnimationFrame(function () {
    time = Date.now()
    animate(window.pageYOffset, el.offsetTop - 20, 0, 500)
  })
}

function animate(curHeight, desiredHeight, dTime, totalTime) {
  var newTime = Date.now()
  var dt = newTime - time
  time = newTime
  var TIME = dTime + dt
  var y = easeInOutQuad(TIME, 0, desiredHeight - curHeight, totalTime)
  if (TIME < totalTime) {
    requestAnimationFrame(function () {
      animate(curHeight, desiredHeight, TIME, totalTime)
    })
  }
  window.scrollTo(0, curHeight + y)
}

@GraphQL
export class Docs extends React.Component {

  static displayName = 'Docs'

  static query = `
    query docs {
      ${queryParts}
    }

    fragment typeFields on __Type {
      name
      description
      fields {
        name
        description
        args {
          name
          description
          type {
            name
            kind
            ofType {
              name
            }
          }
        }
        type {
          name
          kind
          ofType {
            name
          }
        }
      }
    }
  `

  static propTypes = {
    data: React.PropTypes.object,
    errors: React.PropTypes.object,
    query: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  render(): ReactElement {
    return (
      <div>
        <h2>API Documentation</h2>
        <div>
          {map(this.props.data, type => (
            <Panel id={type.name} header={<h3 style={{cursor: 'pointer'}} onClick={() => this.setState({['hide-' + type.name]: !this.state['hide-' + type.name]})}>{type.name}</h3>}>
              <Toggle toggled={this.state['hide-' + type.name]}>
                <label>Description</label>
                <div>{type.description || '--'}</div>
                <div>
                  <label>Fields</label>
                  {map(type.fields, field => (
                    <div>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>{field.name} ({getType.call(this, field)})</div>
                        <div>{field.description || '--'}</div>
                      </div>
                      <ul>
                        {map(field.args, arg => (
                          <li>
                            <span>{arg.name} ({getType.call(this, arg)})</span>
                            <span>{arg.description && ' - ' + arg.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Toggle>
            </Panel>
          ))}
        </div>
        <div style={{paddingBottom: '40%'}}></div>
      </div>
    )
  }

}

var Toggle = React.createClass({

  displayName: 'Toggle',

  getInitialState() {
    return {
      height: 'auto'
    }
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
      <div ref="me" className="toggle-me" style={{overflow: 'hidden', height}}>{this.props.children}</div>
    )
  }

})
