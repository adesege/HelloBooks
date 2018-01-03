import React from 'react';
import { shallow } from 'enzyme';
import Books from 'components/Books';

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


describe('# Books', () => {
  const wrapper = shallow(<Books {...props}/>, context);
  it('should render Books component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });
});
