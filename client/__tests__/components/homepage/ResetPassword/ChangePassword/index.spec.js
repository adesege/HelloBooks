import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedChangePassword, { 
  ChangePassword
} from 'components/homepage/ResetPassword/ChangePassword';

const props = {
  addFlashMessage: jest.fn(),
  resetPasswordAction: jest.fn(),
  params: {
    validationKey: '2345678sdfghjkl'
  }
};

const user = {
  email: '',
  password: '',
  confirmPassword: '',
  validationKey: ''
};

const context = {
  context: {
    router: {
      push: jest.fn()
    }
  }
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({});

describe('# ChangePassword', () => {
  const wrapper = shallow(<ChangePassword {...props}/>, context);
  
  it('should render ChangePassword component', () => {
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
  
  it('should call the isFormValid method', () => {
    wrapper.setState({ user });
    const isFormValidOnSpy = jest.spyOn(wrapper.instance(), 'isFormValid');
    wrapper.instance().isFormValid();
    expect(isFormValidOnSpy).toHaveBeenCalledTimes(1);
  });
  
  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedChangePassword 
      {...props} 
      store={store}
      />, context);
      expect(connectedComponent.length).toBe(1);
    });
  });
  