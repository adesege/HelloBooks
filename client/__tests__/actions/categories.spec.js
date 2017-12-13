import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';

import {
  addBookCategory,
  getBookCategories,
  editBookCategory
} from 'actions/categories';

/* eslint-disable max-nested-callbacks */

const mockStore = configureMockStore([
  thunk
]);

const category = {
  id: 1,
  name: 'Category1'
};

describe('# Categories', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('# Add a book category', () => {
    it('should create CATEGORY_ADDED when a category has been added', () => {
      const message = ['Category added successfully'];
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            category,
            message
          },
        });
      });

      const expectedActions = [
        {
          type: 'CATEGORY_ADDED',
          category
        },
        {
          type: 'ADD_FLASH_MESSAGE',
          message: {
            text: message,
            type: 'success'
          }
        }
      ];

      const store = mockStore({ });
      return store.dispatch(addBookCategory({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it(
      'should create ADD_FLASH_MESSAGE when a category cannot be added',
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
        return store.dispatch(addBookCategory({}))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }
    );
  });

  describe('# Get book category', () => {
    it(
      'should create CATEGORY_FETCHED when a category has been fetched',
      () => {
        const message = ['Category added successfully'];
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: {
              data: category,
              message
            },
          });
        });

        const expectedActions = [
          {
            type: 'CATEGORY_FETCHED',
            category
          }
        ];
        const store = mockStore({ });
        return store.dispatch(getBookCategories({}))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }
    );

    it('should create ADD_FLASH_MESSAGE when a category can\'t ', () => {
      const message = ['Category added successfully'];
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
            type: 'error',
            text: message
          }
        }
      ];
      const store = mockStore({ });
      return store.dispatch(getBookCategories({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('# Edit book category', () => {
    it(
      'should create CATEGORY_EDITED when a category has been edited',
      () => {
        const message = ['Category edited successfully'];
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: {
              data: category,
              message
            },
          });
        });

        const expectedActions = [
          {
            type: 'CATEGORY_EDITED',
            category
          },
          {
            type: 'ADD_FLASH_MESSAGE',
            message: {
              text: message,
              type: 'success'
            }
          }
        ];
        const store = mockStore({ });
        return store.dispatch(editBookCategory({}))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
      }
    );
  });
});
