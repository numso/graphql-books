/* @flow */

import {
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql'

import * as booksModel from './models/books'
import * as authorsModel from './models/authors'
import {Book} from './types'

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

var inputBookType = new GraphQLInputObjectType({
  name: 'InputBook',
  description: 'A book to be inputted into the database.',
  fields: () => ({
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
      type: GraphQLString,
      description: 'The name of the author you want to add.'
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
  description: 'The root query of graphql. Start here :).',
  fields: () => ({
    authors: {
      type: new GraphQLList(authorType),
      description: 'A list of all authors in the database.',
      resolve: () => authorsModel.getAll()
    },
    books: {
      type: new GraphQLList(bookType),
      description: 'A list of all books. If arg is passed in, will filter based on `ownIt`.',
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
      description: 'A specific book, based on an id.',
      args: {
        id: {
          name: 'id',
          description: 'The ID of the book you are trying to look up.',
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: (root, {id}) => booksModel.get(id)
    }
  })
})

var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation of graphql. If you\'re trying to create or update something, start here.',
  fields: {
    updateBook: {
      type: bookType,
      description: 'Update a book, given an id and an object of updates to make.',
      args: {
        id: {
          name: 'id',
          type: new GraphQLNonNull(GraphQLString)
        },
        book: {
          name: 'book',
          type: inputBookType
        }
      },
      resolve: async function (obj, args) {
        var _book = args.book || {}
        var book = await booksModel.get(args.id)
        if (!book) {
          // should I throw an error here?
          return null
        }
        for (var key in _book) {
          var arg = _book[key]
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
    },
    createBook: {
      type: bookType,
      description: 'Create a new book. Requires that you pass in a book object.',
      args: {
        book: {
          name: 'book',
          type: inputBookType
        }
      },
      resolve: async function (obj, args) {
        var _book = args.book || {}
        var book: $Shape<Book> = {ownIt: false}
        for (var key in _book) {
          var arg = _book[key]
          if (arg == null || arg == undefined || key == 'author') {
            continue
          }
          if (key == 'rating' && (arg < 1 || arg > 10)) {
            // should I throw an error here?
            continue
          }
          if (key == 'authorId') {
            if (arg == 'other') {
              if (_book.author) {
                var _res = await authorsModel.create(_book.author)
                book.authorId = _res.generated_keys[0]
              }
              continue
            } else {
              var author = await authorsModel.get(arg)
              if (!author) {
                // should I throw an error here?
                continue
              }
            }
          }
          book[key] = arg
        }
        var res = await booksModel.create(book)
        book.id = res.generated_keys[0]
        return book
      }
    }
  }
})

export var BooksSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})
