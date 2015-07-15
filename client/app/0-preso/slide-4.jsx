/* @flow */

import React from 'react'

var asyncAwait = `
async function getUser(id) {
  var user = await users.get(id)
  user.lastIP = this.session.ip
  return user
}

getUser('abc').then(...)
`
var fatArrows = `
var addTwo = x => x + 2

var sayHi = greet => {
  console.log(greet + ' ' + this.name)
}
`
var destructuring = `
var {map, each, filter} = require('lodash')

var lastName = 'Smith'
function bar({name, birthday}) {
  console.log('birthday: ', birthday)
  return {name, lastName}
}
`
var exportImport = `
import React from 'react'
import {map, reduce} from 'lodash'

export var foo = 7
export function test(a, b) {
  return a + b
}
`
module.exports = React.createClass({

  displayName: 'Slide4',

  render(): ReactElement {
    return (
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <h1>ES 6/7 Primer</h1>
        <div style={{height: '100%', width: '100%', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap'}}>
          <div style={{width: '40%'}}>
            <h4>Async/Await</h4>
            <pre><code className="js">{asyncAwait}</code></pre>
          </div>
          <div style={{width: '40%'}}>
            <h4>Fat Arrows</h4>
            <pre><code className="js">{fatArrows}</code></pre>
          </div>
          <div style={{width: '40%'}}>
            <h4>Destructuring/Restructuring</h4>
            <pre><code className="js">{destructuring}</code></pre>
          </div>
          <div style={{width: '40%'}}>
            <h4>ES6 Export/Import</h4>
            <pre><code className="js">{exportImport}</code></pre>
          </div>
        </div>
      </div>
    )
  }

})
