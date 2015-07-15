/* @flow */

import React from 'react'
import {Link} from 'react-router'
import {Input, Label, Button} from 'react-bootstrap'
import {map} from 'lodash'
import axios from 'axios'

import GraphQL from '../utils/graphql'

function link(key) {
  return {
    value: this.state[key] || '',
    requestChange: val => this.setState({[key]: val})
  }
}

@GraphQL
export class BookNew extends React.Component {

  static query = `
    query GetAuthors {
      authors {
        id,
        name
      }
    }
  `

  static displayName = 'BookNew'

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  save() {
    var params = {book: this.state}
    var query = `
      mutation update($book: InputBook) {
        createBook(book: $book) {
          id
        }
      }
    `

    axios.post('http://localhost:3004/graphql', {query, params})
      .then(res => {
        this.context.router.transitionTo(`book/${res.data.data.createBook.id}`)
      })
  }

  render(): ReactElement {
    var {authors} = this.props.data
    return (
      <div style={{margin: '0 100px'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <h1 style={{margin: '20px 0'}}>New Book</h1>
          <Link to="books">Discard New Book</Link>
        </div>

        <Label>Title:</Label>
        <Input type="text" valueLink={link.call(this, 'title')}/>

        <Label>Rating:</Label>
        <div style={{display: 'flex'}}>
          <input type="range" min={1} max={10} valueLink={link.call(this, 'rating')} style={{flex: 1}}/>
          <div style={{width: 50, textAlign: 'center'}}>{this.state.rating || '--'}</div>
        </div>

        <Label>Description</Label>
        <Input type="textarea" valueLink={link.call(this, 'description')}/>

        <Label>ISBN:</Label>
        <Input type="text" valueLink={link.call(this, 'isbn')}/>

        <Label>Author:</Label>
        <Input type="select" valueLink={link.call(this, 'authorId')}>
          <option value="" disabled> - - - </option>
          {map(authors, a => <option value={a.id}>{a.name}</option>)}
          <option value="other">Other</option>
        </Input>

        {this.state.authorId == 'other' && (
          <div>
            <Input type="text" placeholder="New Author's Name" valueLink={link.call(this, 'author')}/>
          </div>
        )}

        <Label>Cover Url:</Label>
        <Input type="text" valueLink={link.call(this, 'coverUrl')}/>

        <Label>Own It?</Label>
        <Input type='checkbox' label='I Own This Book' checkedLink={link.call(this, 'ownIt')}/>

        <Label>Notes:</Label>
        <Input type="textarea" valueLink={link.call(this, 'notes')}/>

        <Button onClick={this.save.bind(this)}>Save And View</Button>
      </div>
    )
  }

}
