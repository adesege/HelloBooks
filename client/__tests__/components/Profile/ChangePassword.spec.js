import React from 'react';
import { shallow } from 'enzyme';
import ChangePasswordForm from 'components/Profile/ChangePasswordForm';

const props = {
  onChangePasswordInput: jest.fn(),
  onChangePassword: jest.fn(),
  isOpenModal: true,
  toggleOpenModal: jest.fn(),
  isLoading: true,
  errors: {},
  serverErrors: {}
};

describe('# ChangePasswordForm', () => {
  const wrapper = shallow(<ChangePasswordForm {...props}/>);
  it('should render ChangePasswordForm component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Modal').length).toBe(1);
  });
});
