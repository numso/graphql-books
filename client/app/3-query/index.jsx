/* @flow */

import React from 'react'
import {Alert} from 'react-bootstrap'
import {map} from 'lodash'

import GraphQL from '../utils/graphql'

@GraphQL
export class Query extends React.Component {

  static displayName = 'Query'

  static query = `
    query getSchema {
      __schema {
        types {
          name
          description
          kind
          fields {
            name
            description
            type {
              name
            }
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

  render(): ReactElement {
    var data = this.props.data
    return (
      <div>
        <h2 style={{display: 'flex', alignItems: 'center', margin: 20}}>
          <span>Open up</span>
          <pre style={{display: 'inline-block', margin: '0 10px'}}>client/app/query.jsx</pre>
          <span>and mess with the query!</span>
        </h2>
        <div style={{display: 'flex'}}>
          <div style={{flex: 1, padding: '0 5px'}}>
            <h4>Query</h4>
            <pre>{this.props.query}</pre>
          </div>
          <div style={{flex: 1, padding: '0 5px'}}>
            <h4>Results</h4>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>

          {this.props.errors && (
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <div style={{padding: 20}}>
                {map(this.props.errors, e => (
                  <Alert bsStyle='danger'>
                    {e.message}
                  </Alert>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

}

// query bookQuery {
//   books(ownIt: true) {
//     id
//     title
//   }
// }

// query getSchema {
//   __schema {
//     types {
//       name
//       description
//       kind
//       fields {
//         name
//         description
//         type {
//           name
//         }
//       }
//     }
//   }
// }
