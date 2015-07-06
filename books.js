/* @flow */

type Group = {
  id: string;
  title: string;
  books: Array<Book>;
  series: Array<Series>;
}

type Series = {
  id: string;
  title: string;
  rating: number;
  books: Array<Book>;
}

type Book = {
  id: string;
  title: string;
  rating: number;
  description: string;
  isbn: string;
  author: Author;
  coverUrl: string;
  ownIt: boolean;
  notes: ?string;
}

type Author = {
  id: string;
  name: string;
}

type Query = {
  books(ownIt);
  series;
  groups;
  book(id);
  series(id);
  group(id);
}
