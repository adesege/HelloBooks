import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from 'components/Notifications/Sidebar';

const props = {
  searchFilter: {},
  handleInputChange: jest.fn(),
  onFilterSubmit: jest.fn(),
  errors: {},
};

describe('# Sidebar', () => {
  const wrapper = shallow(<Sidebar {...props}/>);
  it('should render Sidebar component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.card-header').length).toBe(1);
  });
});
