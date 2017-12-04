import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedViewBooks, { ViewBooks } from 'components/Books/ViewBooks';
import Modal from 'Modal';

const book = {
  id: 2,
  title: 'A book title',
  coverPhotoPath: '',
  bookCategoryId: 0,
  author: '',
  stockQuantity: 0,
  ISBN: '',
  publishedDate: '',
  description: ''
};

const categories = [{
  id: 1,
  name: 'Category 1'
}];

const props = {
  book: {},
  userId: 1,
  borrowedBook: {},
  borrowBookAction: jest.fn(() => Promise.resolve()),
  getBorrowedBookAction: jest.fn(() => Promise.resolve()),
  returnBorrowedBookAction: jest.fn(() => Promise.resolve()),
  params: {
    id: 1
  },
  getBooks: jest.fn(() => Promise.resolve()),
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
    bookId: 1
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
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    const nextProps = {
      params: { id: 2 },
      book,
      categories
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedViewBooks {...props} store={store} />);
    expect(connectedComponent.length).toBe(1);
  });
});
