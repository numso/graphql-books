/* @flow */

import rethinkdb from 'rethinkdbdash'

import {Author} from '../types'

var r = rethinkdb()

var query = r.db('graphql').table('authors')

export function get(id: string): Promise<Author> {
  return query.get(id).run()
}

export function getAll(): Promise<Array<Author>> {
  return query.run()
}
