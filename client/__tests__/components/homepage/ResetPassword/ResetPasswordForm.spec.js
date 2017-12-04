import React from 'react';
import { shallow } from 'enzyme';
import ResetPasswordForm from 'components/homepage/ResetPassword/ResetPasswordForm';

const props = {
  user: {},
  isLoading: true,
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  errors: {
    email: 'This field is required'
  }
};

describe('# ResetPasswordForm', () => {
  const wrapper = shallow(<ResetPasswordForm {...props}/>);

  it('should render ResetPasswordForm component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('form');
  });
});
