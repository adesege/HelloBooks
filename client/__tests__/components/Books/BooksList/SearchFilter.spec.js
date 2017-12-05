import React from 'react';
import { shallow } from 'enzyme';
import SearchFilter from 'components/Books/BooksList/SearchFilter';

const props = {
  onChangeInput: jest.fn(),
  onSearchFilter: jest.fn(),
  categories: [{
    id: 1,
    name: 'name'
  }],
  searchFilter: {}
};

describe('# SearchFilter', () => {
  const wrapper = shallow(<SearchFilter {...props}/>);
  it('should render SearchFilter component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('form');
  });
});
