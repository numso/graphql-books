/* @flow */

export type Author = {
  id: string;
  name: string;
}

export type Book = {
  id: string;
  title: string;
  rating: number;
  description: string;
  isbn: string;
  authorId: string;
  author: Author;
  coverUrl: string;
  ownIt: boolean;
  notes: ?string;
}

// export type Series = {
//   id: string;
//   title: string;
//   rating: number;
//   books: Array<Book>;
// }
//
// export type Group = {
//   id: string;
//   title: string;
//   books: Array<Book>;
//   series: Array<Series>;
// }

export type Query = {
  books: (ownIt: boolean) => Array<Book>;
  book: (id: string) => Book;
  // series: () => Array<Series>;
  // series: (id: string) => Series;
  // groups: () => Array<Groups>;
  // group: (id: string) => Group;
}
