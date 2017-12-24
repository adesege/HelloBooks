import React from 'react';
import { shallow } from 'enzyme';
import Pagination from 'components/miscellaneous/Pagination';

const props = {
  pagination: {},
  handlePageChange: jest.fn()
};
describe('# Pagination', () => {
  const wrapper = shallow(<Pagination {...props}/>);
  it('should render Pagination component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('a').length).toBe(1);
  });
});
