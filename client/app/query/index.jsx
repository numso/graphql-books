/* @flow */

import React from 'react'
import {Alert} from 'react-bootstrap'
import {map} from 'lodash'

import Kualay from '../utils/kualay'

var Query = React.createClass({

  displayName: 'Query',

  statics: {
    query: `
      query myQuery {
        book(id: "51f44fcd-b530-494a-b388-0d9db5cb86bd") {
          title
          author {
            name,
            books {
              title
            }
          }
        }
      }
    `
  },

  propTypes: {
    data: React.PropTypes.object,
    errors: React.PropTypes.object,
    query: React.PropTypes.string.isRequired
  },

  render(): ReactElement {
    var {data, errors, query} = this.props
    return (
      <div>
        <h2 style={{display: 'flex', alignItems: 'center', margin: 20}}>
          <span>Open up</span>
          <pre style={{display: 'inline-block', margin: '0 10px'}}>client/app/query/index.jsx</pre>
          <span>and mess with the query!</span>
        </h2>
        <div style={{display: 'flex'}}>
          <div style={{flex: 1, padding: '0 5px'}}>
            <h4>Query</h4>
            <pre>{query}</pre>
          </div>
          <div style={{flex: 1, padding: '0 5px'}}>
            <h4>Results</h4>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>

          {errors && (
            <div style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <div style={{padding: 20}}>
                {map(errors, e => (
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

})

export default Kualay.createContainer(Query)

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
