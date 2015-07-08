/* @flow */

import {map} from 'lodash'
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
  })
})

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    authors: {
      type: new GraphQLList(authorType),
      resolve: () => authorsModel.getAll()
    },
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

var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updateBook: {
      type: bookType,
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLString)
        },
        title: {
          name: 'title',
          type: GraphQLString
        },
        rating: {
          name: 'rating',
          type: GraphQLInt
        },
        description: {
          name: 'description',
          type: GraphQLString
        },
        isbn: {
          name: 'isbn',
          type: GraphQLString
        },
        authorId: {
          name: 'authorId',
          type: GraphQLString
        },
        coverUrl: {
          name: 'coverUrl',
          type: GraphQLString
        },
        ownIt: {
          name: 'ownIt',
          type: GraphQLBoolean
        },
        notes: {
          name: 'notes',
          type: GraphQLString
        }
      },
      resolve: async function (obj, args) {
        var book = await booksModel.get(args.id)
        if (!book) {
          // should I throw an error here?
          return null
        }
        for (var key in args) {
          var arg = args[key]
          if (key == 'id' || arg == null || arg == undefined) {
            continue
          }
          if (key == 'rating' && (arg < 1 || arg > 10)) {
            // should I throw an error here?
            continue
          }
          if (key == 'authorId') {
            var author = await authorsModel.get(arg)
            if (!author) {
              // should I throw an error here?
              continue
            }
          }
          book[key] = arg
        }
        await booksModel.update(args.id, book)
        return book
      }
    }
  }
})

export var BooksSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})
