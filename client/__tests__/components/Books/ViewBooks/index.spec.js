import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedViewBooks, { ViewBooks } from 'components/Books/ViewBooks';

const book = {
  id: 1,
  title: 'A book title',
  coverPhotoPath: '',
  bookCategoryId: 0,
  author: '',
  stockQuantity: 0,
  ISBN: '',
  publishedDate: '',
  description: '',
  Category: {
    name: ''
  }
};

const borrowedBook = {
  id: 1,
  bookId: 1
};

const props = {
  book,
  userId: 1,
  borrowedBook,
  borrowBookAction: jest.fn(() => Promise.resolve()),
  getBorrowedBooksAction: jest.fn(() => Promise.resolve()),
  returnBorrowedBookAction: jest.fn(() => Promise.resolve()),
  params: {
    id: 1
  },
  getBooks: jest.fn(() => Promise.resolve())
};

const context = {
  context: {
    router: {
      push: jest.fn()
    }
  }
};


const mockStore = configureMockStore([thunk]);
const store = mockStore({
  auth: {
    user: {
      userId: 1
    }
  },
  books: {
    books: [{
      id: 1,
      title: 'A book title'
    }]
  },
  borrowedBooks: [{
    ...borrowedBook
  }]
});

describe('# ViewBooks', () => {
  const wrapper = shallow(<ViewBooks {...props}/>, context);
  wrapper.setState({ book });
  it('should render ViewBooks component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should call the componentWillReceiveProps method', () => {
    const componentWillReceivePropsSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    const nextProps = {
      params: { id: 1 },
      book: {
        ...book,
        title: 'A title'
      },
      borrowedBook: {
        ...borrowedBook,
        createdAt: '2017-11-11'
      }
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it(
    'should call the toggleDropdown method',
    () => {
      const toggleDropdownOnSpy = jest
        .spyOn(wrapper.instance(), 'toggleDropdown');
      wrapper.instance().toggleDropdown();
      expect(toggleDropdownOnSpy).toHaveBeenCalledTimes(1);
    }
  );

  it('should call the onReturnBorrowedBook method', () => {
    const onReturnBorrowedBookOnSpy = jest
      .spyOn(wrapper.instance(), 'onReturnBorrowedBook');
    wrapper.instance().onReturnBorrowedBook(global.event);
    expect(onReturnBorrowedBookOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onBorrowBook method', () => {
    const onBorrowBookOnSpy = jest.spyOn(wrapper.instance(), 'onBorrowBook');
    wrapper.instance().onBorrowBook(global.event);
    expect(onBorrowBookOnSpy).toHaveBeenCalledTimes(1);
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

  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedViewBooks
      {...props}
      store={store} />);
    expect(connectedComponent.length).toBe(1);
  });
});
