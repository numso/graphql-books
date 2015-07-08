/* @flow */
/* eslint curly: 0 */

import Promise from 'bluebird'
import rethinkdb from 'rethinkdbdash'
import GoogleSpreadsheet from 'google-spreadsheet'
import {filter, find, groupBy, map, pluck, reduce, uniq} from 'lodash'

var r = rethinkdb()

var SHEET_ID = '1h4uVQKvuzf4_BNqddabZJysSyoiXDFPiNQXYqIJmLX0'
var mySheet = new GoogleSpreadsheet(SHEET_ID)
Promise.promisifyAll(mySheet)

var lookup = {
  '1': 'title',
  '2': 'author',
  '3': 'ownIt',
  '4': 'ownIt',
  '7': 'coverUrl'
}

async function getBooks() {
  var data = await mySheet.getCellsAsync(1)
  data = filter(data, cell => cell.row !== 1)
  data = groupBy(data, 'row')
  data = map(data, row => reduce(row, (memo, cell) => {
    var key = lookup[cell.col] || cell.col
    var val = cell.value
    if (cell.col == 3) val = true
    if (cell.col == 4) val = false
    memo[key] = val
    return memo
  }, {}))
  return data
}

function parseAuthors(books) {
  return map(uniq(pluck(books, 'author')), name => ({name}))
}

async function uploadAuthors(authors) {
  var res = await r.db('graphql').table('authors').insert(authors, {returnChanges: true}).run()
  return pluck(res.changes, 'new_val')
}

async function uploadBooks(books, authors) {
  books = map(books, book => {
    book.authorId = find(authors, {name: book.author}).id
    delete book.author
    return book
  })
  await r.db('graphql').table('books').insert(books).run()
}

async function driver() {
  var books = await getBooks()
  var authors = parseAuthors(books)
  authors = await uploadAuthors(authors)
  await uploadBooks(books, authors)
  r.getPool().drain()
  console.log('Success!!')
}

driver().catch(console.error)
