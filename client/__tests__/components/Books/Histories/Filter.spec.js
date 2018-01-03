import React from 'react';
import { shallow } from 'enzyme';
import Filter from 'components/Books/Histories/Filter';

const props = {
  onChangeInput: jest.fn(),
  onSearchFilter: jest.fn(),
  searchFilter: {}
};

describe('# Filter', () => {
  const wrapper = shallow(<Filter {...props}/>);
  it('should render Filter component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('form').length).toBe(1);
  });
});
