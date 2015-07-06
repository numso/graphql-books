/* @flow */

import {graphql} from 'graphql'

import {BooksSchema} from './graphql'

var query = `
  query BookQuery($id: String!) {
    book(id: $id) {
      title,
      rating,
      description,
      author {
        name
      }
    }
  }
`

var params = {
  id: '96e3f765-a06c-4c18-90df-9f8cde2d1af2'
}

graphql(BooksSchema, query, null, params).then(result => {
  console.log(JSON.stringify(result, null, 2))
})

var query2 = `
  query OwnedBooksQuery {
    books(ownIt: true) {
      title,
      author {
        name
      }
    }
  }
`

graphql(BooksSchema, query2).then(result => {
  console.log(JSON.stringify(result, null, 2))
})
