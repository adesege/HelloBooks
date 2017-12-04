import React from 'react';
import { shallow } from 'enzyme';
import SignupForm from 'components/homepage/Signup/SignupForm';

const props = {
  userSignupRequest: jest.fn(),
  addFlashMessage: jest.fn(),
  logUserIn: jest.fn(),
  isLoading: true,
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  user: {},
  validationError: {
    name: 'Error',
    email: 'email@email.com',
    password: 'password',
    confirmPassword: 'password'
  }
};

const context = {
  context: {
    router: {
      push: jest.fn()
    }
  }
};

describe('# SignupForm', () => {
  const wrapper = shallow(<SignupForm {...props}/>, context);
  it('should render SignupForm component', () => {
    expect(wrapper.length).toBe(1);
  });
});
