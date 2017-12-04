import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedBooks, { Books } from 'components/Books';

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

const props = {
  params: {
    id: 2
  },
  book,
  deleteBook: jest.fn(() => Promise.resolve())
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
  books: { books: [book] },
});

describe('# Books', () => {
  const wrapper = shallow(<Books {...props}/>, context);
  it('should call the goToAddPage method', () => {
    const goToAddPageOnSpy = jest.spyOn(wrapper.instance(), 'goToAddPage');
    wrapper.instance().goToAddPage();
    expect(goToAddPageOnSpy).toHaveBeenCalledTimes(1);
  });
  it('should render Books component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedBooks {...props} store={store} />, context);
    expect(connectedComponent.length).toBe(1);
  });
});
