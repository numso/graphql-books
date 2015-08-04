/* @flow */

import React from 'react'
import {Link} from 'react-router'
import {Input, Label, Button} from 'react-bootstrap'
import {map} from 'lodash'

import Kualay from '../utils/kualay'

import type {Author, Book} from '../../../server/types'

type State = $Shape<Book>;

type Props = {
  mutate: (key: string, params: Object) => Promise<any>;
  data: {
    authors: Array<Author>;
  };
};

var BookNew = React.createClass({

  displayName: 'BookNew',

  statics: {
    query: `
      query GetAuthors {
        authors {
          id,
          name
        }
      }
    `,
    mutations: {
      create: `
        mutation update($book: InputBook) {
          createBook(book: $book) {
            id
          }
        }
      `
    }
  },

  propTypes: {
    data: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
    mutate: React.PropTypes.func.isRequired
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState(): State {
    return {}
  },

  save() {
    var props: Props = this.props
    var params = { book: this.state }
    props.mutate('create', params)
      .then(res => {
        this.context.router.transitionTo(`book/${res.data.data.createBook.id}`)
      })
  },

  link(key: $Enum<Book>) {
    return {
      value: this.state[key] || '',
      /* $FlowIssue computed properties */
      requestChange: val => this.setState({[key]: val})
    }
  },

  render(): ReactElement {
    var props: Props = this.props
    var {authors} = props.data
    return (
      <div style={{margin: '0 100px'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <h1 style={{margin: '20px 0'}}>New Book</h1>
          <Link to="books">Discard New Book</Link>
        </div>

        <Label>Title:</Label>
        <Input type="text" valueLink={this.link('title')}/>

        <Label>Rating:</Label>
        <div style={{display: 'flex'}}>
          <input type="range" min={1} max={10} valueLink={this.link('rating')} style={{flex: 1}}/>
          <div style={{width: 50, textAlign: 'center'}}>{this.state.rating || '--'}</div>
        </div>

        <Label>Description</Label>
        <Input type="textarea" valueLink={this.link('description')}/>

        <Label>ISBN:</Label>
        <Input type="text" valueLink={this.link('isbn')}/>

        <Label>Author:</Label>
        <Input type="select" valueLink={this.link('authorId')}>
          <option value="" disabled> - - - </option>
          {map(authors, a => <option value={a.id}>{a.name}</option>)}
          <option value="other">Other</option>
        </Input>

        {this.state.authorId == 'other' && (
          <div>
            <Input type="text" placeholder="New Author's Name" valueLink={this.link('author')}/>
          </div>
        )}

        <Label>Cover Url:</Label>
        <Input type="text" valueLink={this.link('coverUrl')}/>

        <Label>Own It?</Label>
        <Input type='checkbox' label='I Own This Book' checkedLink={this.link('ownIt')}/>

        <Label>Notes:</Label>
        <Input type="textarea" valueLink={this.link('notes')}/>

        <Button onClick={this.save.bind(this)}>Save And View</Button>
      </div>
    )
  }

})

export default Kualay.createContainer(BookNew)
