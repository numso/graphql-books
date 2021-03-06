/* @flow */

import rethinkdb from 'rethinkdbdash'

import {Book} from '../types'

var r = rethinkdb()

var query = r.db('graphql').table('books')

export function create(book: $Shape<Book>): Promise<any> {
  return query.insert(book).run()
}

export function get(id: string): Promise<Book> {
  return query.get(id).run()
}

export function update(id: string, book: Book): Promise<Book> {
  return query.get(id).update(book).run()
}

export function getAll(ownIt: bool): Promise<Array<Book>> {
  if (ownIt === undefined || ownIt === null) {
    return query.run()
  }
  return query.filter({ownIt}).run()
}

export function getByAuthor(authorId: string): Promise<Array<Book>> {
  return query.filter({authorId}).run()
}
