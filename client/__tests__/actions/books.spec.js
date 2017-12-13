import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';

import {
  addBook,
  updateBook,
  deleteBook,
  searchBooks,
  getBooks
} from 'actions/books';
import localStorage from '../__mocks__/localStorage';
import {
  bookData,
  response,
  searchResponse,
  getBookResponse
} from '../__mocks__/actions/book';

/* eslint-disable max-nested-callbacks */

const mockStore = configureMockStore([
  thunk
]);

window.localStorage = localStorage;

describe('# Books', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('# Add a book', () => {
    it('should create BOOK_ADDED when a book has been added', () => {
      moxios.stubRequest('books', {
        status: 200,
        response
      });

      moxios
        .stubRequest(
          'books/1?fields[]=coverPhotoPath&fields[]=documentPath',
          {
            status: 200,
            response
          }
        );
      const expectedActions = [
        {
          type: 'BOOK_ADDED',
          book: response.book
        }
      ];

      const store = mockStore({ });
      return store.dispatch(addBook(bookData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('# Edit a book', () => {
    it('should create BOOK_UPDATED action when a book has been edited', () => {
      const newResponse = {
        ...response,
        message: ['Book updated successfully']
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: newResponse,
        });
      });

      moxios
        .stubRequest('books/1?fields[]=coverPhotoPath&fields[]=documentPath', {
          status: 200,
          response: newResponse
        });

      const expectedActions = [
        {
          type: 'BOOK_UPDATED',
          book: response.book
        },
        {
          type: 'ADD_FLASH_MESSAGE',
          message: {
            text: ['Book updated successfully'],
            type: 'success'
          }
        }
      ];

      const store = mockStore({ });
      return store.dispatch(updateBook(bookData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('# Delete a book', () => {
    it('should create BOOK_DELETED action when a book has been deleted', () => {
      const bookId = 1;
      const newResponse = {
        ...response,
        message: ['Book deleted successfully'],
        bookId: 1
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: newResponse,
        });
      });

      const expectedActions = [
        {
          type: 'BOOK_DELETED',
          bookId
        },
        {
          type: 'ADD_FLASH_MESSAGE',
          message: {
            text: newResponse.message,
            type: 'success'
          }
        }
      ];

      const store = mockStore({ });
      return store.dispatch(deleteBook({ id: bookId }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it(
      'should not create BOOK_DELETED action when a book can\'t be deleted',
      () => {
        const newResponse = {
          ...response,
          message: ['Book not found'],
          bookId: 1
        };

        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400,
            response: newResponse,
          });
        });

        const expectedActions = [
          {
            type: 'ADD_FLASH_MESSAGE',
            message: {
              text: newResponse.message,
              type: 'error'
            }
          }
        ];

        const store = mockStore({ });
        return store.dispatch(deleteBook({ id: 1 }))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }
    );
  });

  describe('# Search a book', () => {
    it(
      'should create BOOKS_SEARCHED action when a book has been searched',
      () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: searchResponse,
          });
        });

        const expectedActions = [
          {
            type: 'BOOKS_SEARCHED',
            result: response.book,
          }
        ];

        const store = mockStore({ });
        return store.dispatch(searchBooks(bookData.title))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }
    );
  });

  describe('# Get a book', () => {
    it('should create SET_BOOKS action when a book has been gotten', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            data: getBookResponse.books,
            pagination: getBookResponse.pagination
          },
        });
      });

      const expectedActions = [
        {
          type: 'SET_BOOKS',
          books: getBookResponse.books,
          pagination: getBookResponse.pagination,
        }
      ];

      const store = mockStore({ });
      return store.dispatch(getBooks(bookData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it(
      'should not create SET_BOOKS action when a book can\'t be gotten',
      () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 500,
            response: getBookResponse,
          });
        });

        const expectedActions = [
          {
            type: 'ADD_FLASH_MESSAGE',
            message: {
              text: getBookResponse.message,
              type: 'error'
            }
          }
        ];

        const store = mockStore({ });
        return store.dispatch(getBooks(bookData))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }
    );
  });
});
