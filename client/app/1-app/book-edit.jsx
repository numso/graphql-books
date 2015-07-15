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
export class BookEdit extends React.Component {

  static displayName = 'BookEdit'

  static query = `
    query BookQuery($id: String!) {
      book(id: $id) {
        id,
        title,
        rating,
        description,
        isbn,
        authorId,
        coverUrl,
        ownIt,
        notes
      }
      authors {
        id,
        name
      }
    }
  `

  static getParams(props) {
    return {
      id: props.params.id
    }
  }

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = props.data.book
  }

  save() {
    var params = {book: this.state, id: this.state.id}
    var query = `
      mutation update($id: String! $book: InputBook) {
        updateBook(id: $id book: $book) {
          id
        }
      }
    `

    axios.post('http://localhost:3004/graphql', {query, params})
      .then(() => this.context.router.transitionTo(`book/${this.props.params.id}`))
  }

  render(): ReactElement {
    var {authors, book} = this.props.data
    return (
      <div style={{margin: '0 100px'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <h1 style={{margin: '20px 0'}}>Editing Book: {book.title}</h1>
          <Link to={`book/${book.id}`}>Discard Changes</Link>
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
        </Input>

        <Label>Cover Url:</Label>
        <Input type="text" valueLink={link.call(this, 'coverUrl')}/>

        <Label>Own It?</Label>
        <Input type='checkbox' label='I Own This Book' checkedLink={link.call(this, 'ownIt')}/>

        <Label>Notes:</Label>
        <Input type="textarea" valueLink={link.call(this, 'notes')}/>

        <Button onClick={this.save.bind(this)}>Save And Return</Button>
      </div>
    )
  }

}