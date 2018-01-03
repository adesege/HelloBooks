import bookReducer from 'reducers/books';
import { initialBookState } from 'reducers/initialState';
import {
  setBooks,
  bookAdded,
  booksSearched,
  bookUpdated,
  bookDeleted
} from 'actions/books';


describe('# Book Reducer', () => {
  const bookObject = {
    books: [
      { id: 1, title: 'A book title' }
    ],
    pagination: {
      pageSize: 1,
      totalCount: 1,
      page: 1,
      pageCount: 1,
      limit: 1
    }
  };

  it('should return initial state for unknown action types', () => {
    const state = bookReducer(undefined);
    expect(state).toEqual(initialBookState);
    expect(state.books).toEqual([]);
    expect(state.pagination).toEqual({
      pageSize: 0,
      totalCount: 0,
      page: 0,
      pageCount: 0,
      limit: 0
    });
  });

  it('should handle SET_BOOKS action type', () => {
    const action = setBooks(bookObject);
    const state = bookReducer(initialBookState, action);
    expect(state.books).toEqual(bookObject.books);
    expect(state.pagination).toEqual(bookObject.pagination);
  });

  it('should handle BOOK_ADDED action type', () => {
    const newBookObject = {
      books: { id: 2, title: 'This is book title' },
      pagination: {
        pageSize: 1,
        totalCount: 2,
        page: 1,
        pageCount: 1,
        limit: 2
      }
    };

    const newState = {
      books: [
        newBookObject.books,
        ...bookObject.books
      ],
      pagination: { ...bookObject.pagination }
    };
    const action = bookAdded(newBookObject.books);
    const state = bookReducer(bookObject, action);
    expect(state.books).toEqual(newState.books);
    expect(state.pagination).toEqual(newState.pagination);
  });

  it('should handle BOOKS_SEARCHED action type', () => {
    const action = booksSearched(bookObject.books);
    const state = bookReducer(bookObject.books, action);
    expect(state.books).toEqual(bookObject.books);
  });

  describe('# Update Book', () => {
    it('should handle BOOK_UPDATED action type', () => {
      const newBookObject = {
        books: [{
          ...bookObject.books[0],
          title: 'Updated Book title'
        }],
        pagination: { ...bookObject.pagination }
      };
      const action = bookUpdated(newBookObject.books[0]);
      const state = bookReducer(bookObject, action);
      expect(state.books).toEqual(newBookObject.books);
      expect(state.books[0].title).toEqual(newBookObject.books[0].title);
    });
    it('should not handle BOOK_UPDATED if book id cannot be found', () => {
      const newBookObject = {
        books: [{
          ...bookObject.books[0],
          id: 3
        }],
        pagination: { ...bookObject.pagination }
      };
      const action = bookUpdated(newBookObject.books[0]);
      const state = bookReducer(bookObject, action);
      expect(state.books).toEqual(bookObject.books);
      expect(state.books[0].title).toEqual(bookObject.books[0].title);
    });
  });

  describe('# Delete Book', () => {
    it('should handle BOOK_DELETED action type', () => {
      const action = bookDeleted({
        id: 1
      });
      const state = bookReducer(bookObject, action);
      expect(state.books).toEqual([]);
      expect(state.books.title).toBeUndefined();
    });

    it('should return state if book cannot be found', () => {
      const action = bookDeleted({
        id: 2
      });
      const state = bookReducer(bookObject, action);
      expect(state.books).toEqual(bookObject.books);
    });
  });
});
