import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedLogin, { Login } from 'components/homepage/Login';

const props = {
  login: jest.fn(),
  addFlashMessage: jest.fn(),
  setCurrentUser: jest.fn(),
  logUserIn: jest.fn(),
  isAuthenticated: true
};

const context = {
  context: {
    router: {
      push: jest.fn()
    }
  }
};

const user = {
  email: '',
  password: '',
  oauthID: ''
};

const errorResponse = {
  error: 'popup_closed_by_user'
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  auth: {
    user: {
      userId: 1
    }
  }
});

describe('# Login', () => {
  const wrapper = shallow(<Login {...props}/>, context);
  it('should render Login component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should call the onFacebookCallback method', () => {
    const onFacebookCallbackOnSpy = jest
      .spyOn(wrapper.instance(), 'onFacebookCallback');
    wrapper.instance().onFacebookCallback(user);
    expect(onFacebookCallbackOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onGoogleCallback method', () => {
    const onGoogleCallbackOnSpy = jest
      .spyOn(wrapper.instance(), 'onGoogleCallback');
    wrapper.instance().onGoogleCallback({ profileObj: user });
    expect(onGoogleCallbackOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onGoogleFailure method', () => {
    const onGoogleFailureOnSpy = jest
      .spyOn(wrapper.instance(), 'onGoogleFailure');
    wrapper.instance().onGoogleFailure(errorResponse);
    expect(onGoogleFailureOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the isFormValid method', () => {
    const isFormValidOnSpy = jest
      .spyOn(wrapper.instance(), 'isFormValid');
    wrapper.instance().isFormValid();
    expect(isFormValidOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onChange method', () => {
    const newEvent = {
      ...global.event,
      target: {
        name: 'name',
        value: 'value'
      }
    };
    const onChangeOnSpy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange(newEvent);
    expect(onChangeOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedLogin 
      {...props} 
      store={store} />);
    expect(connectedComponent.length).toBe(1);
  });
});
