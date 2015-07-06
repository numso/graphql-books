/* @flow */

import {
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql'

import * as booksModel from './models/books'
import * as authorsModel from './models/authors'

var authorType = new GraphQLObjectType({
  name: 'Author',
  description: 'An author of a book.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the author.'
    },
    name: {
      type: GraphQLString,
      description: 'The name of the author.'
    },
    books: {
      type: new GraphQLList(bookType),
      description: 'All the books this author has written',
      resolve: (author) => booksModel.getByAuthor(author.id)
    }
  })
})

var bookType = new GraphQLObjectType({
  name: 'Book',
  description: 'A book that you either have or want to get.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The id of the book.'
    },
    title: {
      type: GraphQLString,
      description: 'The title of the book.'
    },
    rating: {
      type: GraphQLInt,
      description: 'The rating out of 10 that you give the book'
    },
    description: {
      type: GraphQLString,
      description: 'The description of the book.'
    },
    isbn: {
      type: GraphQLString,
      description: 'The isbn of the book.'
    },
    authorId: {
      type: GraphQLString,
      description: 'The id of the author who wrote the book.'
    },
    author: {
      type: authorType,
      description: 'The author who wrote the book',
      resolve: (book) => authorsModel.get(book.authorId)
    },
    coverUrl: {
      type: GraphQLString,
      description: 'The coverUrl of the book.'
    },
    ownIt: {
      type: GraphQLBoolean,
      description: 'Whether or not you own the book or want to buy it.'
    },
    notes: {
      type: GraphQLString,
      description: 'The notes about the book.'
    }

    // friends: {
    //   type: new GraphQLList(characterInterface),
    //   description: 'The friends of the human, or an empty list if they ' +
    //                'have none.',
    //   resolve: (human) => getFriends(human)
    // },
    // appearsIn: {
    //   type: new GraphQLList(episodeEnum),
    //   description: 'Which movies they appear in.'
    // }
  })
})

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    books: {
      type: new GraphQLList(bookType),
      args: {
        ownIt: {
          name: 'ownIt',
          type: GraphQLBoolean
        }
      },
      resolve: (root, {ownIt}) => booksModel.getAll(ownIt)
    },
    book: {
      type: bookType,
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, {id}) => booksModel.get(id)
    }
  })
})

export var BooksSchema = new GraphQLSchema({
  query: queryType
})
