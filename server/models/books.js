/* @flow */

import rethinkdb from 'rethinkdbdash'

import {Book} from '../types'

var r = rethinkdb()

var query = r.db('graphql').table('books')

export function get(id: string): Promise<Book> {
  return query.get(id).run()
}

export function getAll(ownIt: bool): Promise<Array<Book>> {
  return query.filter({ownIt}).run()
}

export function getByAuthor(authorId: string): Promise<Array<Book>> {
  return query.filter({authorId}).run()
}
