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

// Code Goes Here

export var BooksSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})
