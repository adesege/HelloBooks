import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedSignup, { Signup } from 'components/homepage/Signup';

const props = {
  addFlashMessage: jest.fn(),
  userSignupRequest: jest.fn(() => Promise.resolve()),
  logUserIn: jest.fn()
};

const context = {
  context: {
    router: {
      push: jest.fn()
    }
  }
};

const user = {
  id: '34567897654321',
  name: 'name',
  email: 'email',
  password: 'password',
  confirmPassword: 'password',
  oauthID: '1234567890'
};


const mockStore = configureMockStore([thunk]);
const store = mockStore({});

describe('# Signup', () => {
  const wrapper = shallow(<Signup {...props}/>, context);
  wrapper.setState({ user });
  it('should call the onFacebookCallback method', () => {
    const onFacebookCallbackOnSpy = jest.spyOn(wrapper.instance(), 'onFacebookCallback');
    wrapper.instance().onFacebookCallback(user);
    expect(onFacebookCallbackOnSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the onGoogleCallback method', () => {
    const onGoogleCallbackOnSpy = jest.spyOn(wrapper.instance(), 'onGoogleCallback');
    wrapper.instance().onGoogleCallback({ profileObj: user });
    expect(onGoogleCallbackOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onGoogleFailure method', () => {
    const onGoogleFailureOnSpy = jest.spyOn(wrapper.instance(), 'onGoogleFailure');
    wrapper.instance().onGoogleFailure();
    expect(onGoogleFailureOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should render Signup component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
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

  it('should call the onSubmit method', () => {
    wrapper.setState({ user });
    const onSubmitOnSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    wrapper.instance().onSubmit(global.event);
    expect(onSubmitOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedSignup {...props} store={store} />, context);
    expect(connectedComponent.length).toBe(1);
  });
});
