import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import expect from 'expect';

import {
  login,
  logout
} from 'actions/auth';
import { userSignupRequestAction } from 'actions/signupActions';
import { response, signupResponseFailure, signinResponseFailure } from '../__mocks__/user';

/* eslint-disable max-nested-callbacks */

const mockStore = configureMockStore([
  thunk
]);

describe('# Auth', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('# Signup', () => {
    it('creates SET_CURRENT_USER when signup action is successful', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response,
        });
      });

      const expectedActions = [
        {
          type: 'ADD_FLASH_MESSAGE',
          message: {
            text: ['Your account has been created successfully'],
            type: 'success'
          }
        },
        { type: 'SET_CURRENT_USER', user: response.payload }
      ];

      const store = mockStore({ });
      return store.dispatch(userSignupRequestAction({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should not create a user when signup action fails', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: signupResponseFailure,
        });
      });

      const expectedActions = [
        {
          type: 'ADD_FLASH_MESSAGE',
          message: {
            text: ['The name field is required'],
            type: 'error'
          }
        }
      ];

      const store = mockStore({});
      return store.dispatch(userSignupRequestAction({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('# Signin', () => {
    it('should create SET_CURRENT_USER when signin action is successful', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response,
        });
      });

      const expectedActions = [
        { type: 'SET_CURRENT_USER', user: response.payload }
      ];

      const store = mockStore({ });
      return store.dispatch(login({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should not log a user in when signin action fails', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: signinResponseFailure,
        });
      });

      const expectedActions = [
        {
          type: 'ADD_FLASH_MESSAGE',
          message: {
            text: ['Sorry, we can\'t find this account'],
            type: 'error'
          },
        }
      ];

      const store = mockStore({ });
      return store.dispatch(login({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('# Logout', () => {
    it('should log a user out when the logout action is dispatched', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: response,
        });
      });

      const expectedActions = [
        { type: 'SET_CURRENT_USER', user: {} }
      ];

      const store = mockStore({ });
      store.dispatch(logout());
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
