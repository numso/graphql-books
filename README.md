Preso
=====
- What is GraphQL
  - anyone here used it?
  - replaces REST
  - REST is either
    - 1) very specific endpoints that can't be reused
    - 2) very generic endpoints, you do lots of over-fetching + joins, end up at 1)
  - server defines data possibilities
  - client defines data requirements
  - queries look like the structure you get back
  - no more under-fetching or over-fetching or api versioning
  - can put it in gradually
- Show the app
  - book management for my wife
  - can view books you have or want, add new books, and edit books
  - right now it's in REST
    - problem 1: hard to change things
    - problem 2: not as reusable as it could be
  - rewrite it in GraphQL
    - solution 1: Add ISBN to the books view
    - solution 1: Add rating to the book view
    - solution 2: Add another Shelf component






query empty {
  ${Shelf.query}
}

  <Shelf data={props.data}/>
