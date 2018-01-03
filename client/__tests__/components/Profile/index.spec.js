import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedProfile, { Profile } from 'components//Profile';

const users = [{
  id: 1,
  name: 'Test'
}];

const props = {
  userId: 1,
  getUsersAction: jest.fn(),
  addFlashMessage: jest.fn(),
  updateUserAction: jest.fn(() => Promise.resolve({
    response: {
      status: 200
    }
  })),
  userGroup: 'user',
  user: {}
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  auth: {
    user: {
      userId: 1
    }
  },
  users
});

describe('# Profile', () => {
  const wrapper = shallow(<Profile {...props}/>);
  wrapper.setState({
    user: users,
    passwordChange: {
      oldPassword: 'password',
      password: 'password',
      confirmPassword: 'password',
      userId: 1
    }
  });
  it('should render Profile component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should call the componentWillReceiveProps method', () => {
    const componentWillReceivePropsSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    const nextProps = {
      user: users[0],
      pagination: { limit: 10 }
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onChangePassword method', () => {
    const onChangePasswordSpy = jest
      .spyOn(wrapper.instance(), 'onChangePassword');
    wrapper.instance().onChangePassword(global.event);
    expect(onChangePasswordSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the toggleOpenModal method', () => {
    const toggleOpenModalSpy = jest
      .spyOn(wrapper.instance(), 'toggleOpenModal');
    wrapper.instance().toggleOpenModal();
    expect(toggleOpenModalSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onChangePasswordInput method', () => {
    const newEvent = {
      ...global.event,
      target: {
        name: 'name',
        value: 'value'
      }
    };
    const onChangePasswordInputOnSpy = jest
      .spyOn(wrapper.instance(), 'onChangePasswordInput');
    wrapper.instance().onChangePasswordInput(newEvent);
    expect(onChangePasswordInputOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the isFormValid method', () => {
    const isFormValidSpy = jest
      .spyOn(wrapper.instance(), 'isFormValid');
    wrapper.instance().isFormValid();
    expect(isFormValidSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedProfile
      {...props}
      store={store} />);
    expect(connectedComponent.length).toBe(1);
  });
});
