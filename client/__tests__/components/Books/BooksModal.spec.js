import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedBooksModal, { BooksModal } from 'components/Books/BooksModal';
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
  params: {
    id: 2
  },
  book,
  coverPhotoPath: '',
  addFlashMessage: jest.fn(),
  addBook: jest.fn(),
  updateBook: jest.fn(),
  getBook: jest.fn(),
  setBooks: jest.fn(),
  getCategoriesAction: jest.fn(),
  categories
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
  books: book,
  cropper: { coverPhotoPath: '' },
  categories
});

describe('# BooksModal', () => {
  const wrapper = shallow(<BooksModal {...props}/>, context);
  wrapper.setState({ book });
  it('should render BooksModal component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe(Modal);
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
  it('should call the goToBooksPage method', () => {
    const goToBooksPageOnSpy = jest.spyOn(wrapper.instance(), 'goToBooksPage');
    wrapper.instance().goToBooksPage();
    expect(goToBooksPageOnSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the toggleOpenModal method', () => {
    const toggleOpenModalOnSpy = jest.spyOn(wrapper.instance(), 'toggleOpenModal');
    wrapper.instance().toggleOpenModal();
    expect(toggleOpenModalOnSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the closeOnClick method', () => {
    const closeOnClickOnSpy = jest.spyOn(wrapper.instance(), 'closeOnClick');
    wrapper.instance().closeOnClick(global.event);
    expect(closeOnClickOnSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the isFormValid method', () => {
    const isFormValidOnSpy = jest.spyOn(wrapper.instance(), 'isFormValid');
    wrapper.instance().isFormValid();
    expect(isFormValidOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedBooksModal {...props} store={store} />);
    expect(connectedComponent.length).toBe(1);
  });

  it('should call the onClickOk method', () => {
    const onClickOkOnSpy = jest.spyOn(wrapper.instance(), 'onClickOk');
    wrapper.instance().onClickOk();
    expect(onClickOkOnSpy).toHaveBeenCalledTimes(1);
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

  describe('onChangeUploadInput', () => {
    it('should call the onChangeUploadInput method', () => {
      const onChangeUploadInputOnSpy = jest.spyOn(wrapper.instance(), 'onChangeUploadInput');
      wrapper.instance().onChangeUploadInput(global.event);
      expect(onChangeUploadInputOnSpy).toHaveBeenCalledTimes(1);
    });
    it('should return false if window.FileReader cannot be found', () => {
      window.FileReader = false;
      const onChangeUploadInputOnSpy = jest.spyOn(wrapper.instance(), 'onChangeUploadInput');
      wrapper.instance().onChangeUploadInput(global.event);
      expect(onChangeUploadInputOnSpy).toHaveBeenCalledTimes(2);
    });
  });
});
