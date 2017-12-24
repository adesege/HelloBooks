import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';

import {
  borrowBook,
  getBorrowedBooks,
  returnBorrowedBook
} from 'actions/borrowedBooks';
import borrowedBookMock from '../__mocks__/actions/borrowedBooks';

/* eslint-disable max-nested-callbacks */

const mockStore = configureMockStore([
  thunk
]);

describe('# Borrowed Books', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Borrow a book', () => {
    it(
      'should create BOOK_BORROWED and '+
      'ADD_FLASH_MESSAGE when a book has been borrowed',
      () => {
        moxios.stubRequest('users/1/books', {
          status: 200,
          response: borrowedBookMock.response
        });

        const expectedActions = [
          {
            type: 'BOOK_BORROWED',
            book: borrowedBookMock.book,
            isReturned: false
          },
          {
            type: 'ADD_FLASH_MESSAGE',
            message: {
              text: borrowedBookMock.response.message,
              type: 'success'
            }
          }
        ];

        const store = mockStore({ });
        return store.dispatch(borrowBook(borrowedBookMock.book))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }
    );
    it('should create BOOK_BORROWED when a book has been borrowed', () => {
      moxios.stubRequest('users/1/books', {
        status: 400,
        response: borrowedBookMock.error
      });

      const expectedActions = [
        {
          type: 'ADD_FLASH_MESSAGE',
          message: {
            text: borrowedBookMock.error.message,
            type: 'error'
          }
        }
      ];

      const store = mockStore({ });
      return store.dispatch(borrowBook(borrowedBookMock.book))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('Get Borrowed book', () => {
    it(
      'should create GET_BORROWED_BOOKS when request is successful',
      () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: borrowedBookMock.getResponseData,
          });
        });

        const expectedActions = [
          {
            type: 'GET_BORROWED_BOOKS',
            book: borrowedBookMock.getResponseData.books
          }
        ];

        const store = mockStore({ });
        return store
        .dispatch(getBorrowedBooks(borrowedBookMock.getRequestData))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }
    );

    it(
      'should create ADD_FLASH_MESSAGE when request is not successful',
      () => {
        const message = ['There was an error processing your request'];
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400,
            response: {
              message
            },
          });
        });

        const expectedActions = [
          {
            type: 'ADD_FLASH_MESSAGE',
            message: {
              text: message,
              type: 'error'
            }
          }
        ];

        const store = mockStore({ });
        return store
        .dispatch(getBorrowedBooks(borrowedBookMock.getRequestData))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }
    );
  });

  describe('Returned Borrowed book', () => {
    it(
      'should create BOOK_RETURNED when request is successful',
      () => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: borrowedBookMock.returnResponseData,
          });
        });

        const expectedActions = [
          {
            type: 'BOOK_RETURNED',
            book: borrowedBookMock.returnRequestData,
            isReturned: true
          },
          {
            type: 'ADD_FLASH_MESSAGE',
            message: {
              text: borrowedBookMock.returnResponseData.message,
              type: 'success'
            }
          }
        ];

        const store = mockStore({ });
        return store
        .dispatch(returnBorrowedBook(borrowedBookMock.returnRequestData))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }
    );

    it(
      'should create error ADD_FLASH_MESSAGE when request is not successful',
      () => {
        const message = ['There was an error completing your request'];
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 400,
            response: {
              message
            },
          });
        });

        const expectedActions = [
          {
            type: 'ADD_FLASH_MESSAGE',
            message: {
              text: message,
              type: 'error'
            }
          }
        ];

        const store = mockStore({ });
        return store
        .dispatch(returnBorrowedBook(borrowedBookMock.returnRequestData))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }
    );
  });
});
