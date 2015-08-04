/* @flow */

import React from 'react'
import {Panel} from 'react-bootstrap'
import {map} from 'lodash'

import Kualay from '../utils/kualay'
import Toggle from './toggle'
import {smoothScrollTo} from './smooth-scroll'

var types = ['Query', 'Mutation', 'Book', 'Author']
var queryParts = map(types, t => `
  ${t}: __type(name: "${t}") {
    ...typeFields
  }
`).join('')

var Docs = React.createClass({

  displayName: 'Docs',

  propTypes: {
    data: React.PropTypes.object,
    errors: React.PropTypes.object,
    query: React.PropTypes.string.isRequired
  },

  statics: {
    query: `
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
  },

  getInitialState() {
    return {}
  },

  jumpTo(name: string) {
    /* $FlowIssue computed property keys */
    this.setState({['hide-' + name]: false})
    smoothScrollTo(name)
  },

  linkify(name: string): ReactElement {
    if (name === 'Book' || name === 'Author') {
      return <a style={{cursor: 'pointer'}} onClick={() => this.jumpTo(name)}>{name}</a>
    }
    return <span>name</span>
  },

  getLabel(field: Object): ReactElement {
    if (field.type.kind == 'LIST') {
      return <span>Array&lt;{this.linkify(field.type.ofType.name)}&gt;</span>
    }
    if (field.type.kind == 'NON_NULL') {
      return <span>{this.linkify(field.type.ofType.name)}*</span>
    }
    return <span>{this.linkify(field.type.name)}</span>
  },

  render(): ReactElement {
    return (
      <div>
        <h2>API Documentation</h2>
        <div>
          {map(this.props.data, type => (
            /* $FlowIssue computed property keys */
            <Panel id={type.name} header={<h3 style={{cursor: 'pointer'}} onClick={() => this.setState({['hide-' + type.name]: !this.state['hide-' + type.name]})}>{type.name}</h3>}>
              <Toggle toggled={this.state['hide-' + type.name]}>
                <label>Description</label>
                <div>{type.description || '--'}</div>
                <div>
                  <label>Fields</label>
                  {map(type.fields, field => (
                    <div>
                      <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div>{field.name} ({this.getLabel(field)})</div>
                        <div>{field.description || '--'}</div>
                      </div>
                      <ul>
                        {map(field.args, arg => (
                          <li>
                            <span>{arg.name} ({this.getLabel(arg)})</span>
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
        <div style={{paddingBottom: '70%'}}></div>
      </div>
    )
  }

})

export default Kualay.createContainer(Docs)
