import React from 'react';
import { shallow } from 'enzyme';
import ChangePasswordForm from 'components/homepage/ResetPassword/ChangePassword/ChangePasswordForm';

const props = {
  user: {},
  isLoading: false,
  onChange: jest.fn(),
  onSubmit: jest.fn(),
  errors: {},
};

describe('# Change Password Form', () => {
  const wrapper = shallow(<ChangePasswordForm {...props}/>);

  it('should render ChangePasswordForm component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('form');
  });
});
