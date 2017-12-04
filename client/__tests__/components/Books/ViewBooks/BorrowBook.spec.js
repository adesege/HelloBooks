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

  it('should call the componentWillReceiveProps method', () => {
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    const nextProps = {
      borrowedBook: {
        id: 1,
        createdAt: '1111-11-11'
      },
      isBorrowedBook: true
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the toggleDropdown method', () => {
    const toggleDropdownOnSpy = jest.spyOn(wrapper.instance(), 'toggleDropdown');
    wrapper.instance().toggleDropdown();
    expect(toggleDropdownOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the returnBorrowedBook method', () => {
    const returnBorrowedBookOnSpy = jest.spyOn(wrapper.instance(), 'returnBorrowedBook');
    wrapper.instance().returnBorrowedBook(global.event);
    expect(returnBorrowedBookOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onSubmit method', () => {
    const onSubmitOnSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    wrapper.instance().onSubmit(global.event);
    expect(onSubmitOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onChange method', () => {
    const newEvent = {
      ...global.event,
      target: {
        name: 'name',
        value: 'value'
      }
    };
    const onChangeOnSpy = jest.spyOn(wrapper.instance(), 'onChange');
    wrapper.instance().onChange(newEvent);
    expect(onChangeOnSpy).toHaveBeenCalledTimes(1);
  });
});
