/* @flow */

import React from 'react'
import {Link} from 'react-router'
import {Input, Label, Button} from 'react-bootstrap'
import {map} from 'lodash'

import Kualay from '../utils/kualay'

import type {Author, Book} from '../../../server/types'

type State = $Shape<Book>;

type Props = {
  params: {
    id: string;
  };
  mutate: (key: string, params: Object) => Promise<any>;
  data: {
    book: Book;
    authors: Array<Author>;
  };
};

var BookEdit = React.createClass({

  displayName: 'BookEdit',

  statics: {
    query: `
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
    `,
    mutations: {
      update: `
        mutation update($id: String! $book: InputBook) {
          updateBook(id: $id book: $book) {
            id
          }
        }
      `
    },
    getParams(props: Props) {
      return {
        id: props.params.id
      }
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

  componentWillMount() {
    var props: Props = this.props
    this.setState(props.data.book)
  },

  save() {
    var props: Props = this.props
    var params = {book: this.state, id: this.state.id}
    props.mutate('update', params)
      .then(() => this.context.router.transitionTo(`book/${props.params.id}`))
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
    var {authors, book} = props.data
    return (
      <div style={{margin: '0 100px'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <h1 style={{margin: '20px 0'}}>Editing Book: {book.title}</h1>
          <Link to={`book/${book.id}`}>Discard Changes</Link>
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
        </Input>

        <Label>Cover Url:</Label>
        <Input type="text" valueLink={this.link('coverUrl')}/>

        <Label>Own It?</Label>
        <Input type='checkbox' label='I Own This Book' checkedLink={this.link('ownIt')}/>

        <Label>Notes:</Label>
        <Input type="textarea" valueLink={this.link('notes')}/>

        <Button onClick={this.save}>Save And Return</Button>
      </div>
    )
  }

})

export default Kualay.createContainer(BookEdit)
