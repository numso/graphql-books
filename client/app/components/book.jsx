/* @flow */

import React from 'react'
import {Link} from 'react-router'

import Shelf from './pieces/shelf'
import Kualay from '../utils/kualay'

import type {Book as BookT} from '../../../server/types'

type Props = {
  params: {
    id: string;
  };
  data: {
    book: BookT;
  };
};

var Book = React.createClass({

  displayName: 'Book',

  statics: {
    query: `
      query BookQuery($id: String!) {
        book(id: $id) {
          id,
          title,
          description,
          rating,
          coverUrl,
          author {
            name,
            ${Shelf.query}
          }
        }
      }
    `,
    getParams(props: Props) {
      return {
        id: props.params.id
      }
    }
  },

  propTypes: {
    params: React.PropTypes.object.isRequired,
    data: React.PropTypes.object.isRequired
  },

  render(): ReactElement {
    var props: Props = this.props
    var {book} = props.data
    var author = book.author || { name: '--', books: []}
    return (
      <div>
        <div style={{display: 'flex', position: 'relative', marginTop: 30}}>
          <div>
            <img src={book.coverUrl} style={{maxWidth: 200, maxHeight: 320}}/>
          </div>
          <div style={{paddingLeft: 20}}>
            <div style={{fontSize: 36}}>{book.title} ({book.rating} / 10)</div>
            <div style={{paddingLeft: 10}}>by {author.name}</div>
            <div style={{paddingTop: 20, paddingLeft: 10}}>{book.description}</div>
          </div>
          <Link style={{position: 'absolute', top: 10, right: 30}} to={`book/${book.id}/edit`}>Edit Book</Link>
        </div>
        <div style={{padding: '30px 0', fontSize: 18}}>Other Books by this author:</div>
        <Shelf data={author}/>
      </div>
    )
  }

})

export default Kualay.createContainer(Book)
