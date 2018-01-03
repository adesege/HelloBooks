import React from 'react';
import { shallow } from 'enzyme';
import Info from 'components/Profile/Info';

const props = {
  user: {
    name: 'test',
    email: 'test@mail.com'
  },
  onChangePasswordInput: jest.fn(),
  onChangePassword: jest.fn(),
  isOpenModal: true,
  toggleOpenModal: jest.fn(),
  isLoading: true,
  errors: {},
  serverErrors: {}
};

describe('# Info', () => {
  const wrapper = shallow(<Info {...props}/>);
  it('should render Info component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.row').length).toBe(2);
  });
});
