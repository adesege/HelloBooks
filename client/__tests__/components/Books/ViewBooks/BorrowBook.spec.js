import React from 'react';
import { shallow } from 'enzyme';
import BorrowBook from 'components/Books/ViewBooks/BorrowBook';

const props = {
  bookId: '',
  isBorrowedBook: false,
  userId: 0,
  borrowBookAction: jest.fn(() => Promise.resolve()),
  returnBorrowedBookAction: jest.fn(() => Promise.resolve()),
  borrowedBook: {
    id: 1,
    createdAt: '0000-00-00'
  }
};

describe('# BorrowBook', () => {
  const wrapper = shallow(<BorrowBook {...props}/>);
  it('should render BorrowBook component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('ButtonDropdown').length).toBe(1);
  });
});
