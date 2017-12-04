import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedDeleteModal, { DeleteModal } from 'components/Books/DeleteModal';

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

describe('# DeleteModal', () => {
  const wrapper = shallow(<DeleteModal {...props}/>, context);
  it('should call the goToBooksPage method', () => {
    const goToBooksPageOnSpy = jest.spyOn(wrapper.instance(), 'goToBooksPage');
    wrapper.instance().goToBooksPage();
    expect(goToBooksPageOnSpy).toHaveBeenCalledTimes(1);
  });
  it('should render DeleteModal component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedDeleteModal {...props} store={store} />);
    expect(connectedComponent.length).toBe(1);
  });

  it('should call the toggleOpenModal method', () => {
    const toggleOpenModalOnSpy = jest.spyOn(wrapper.instance(), 'toggleOpenModal');
    wrapper.instance().toggleOpenModal();
    expect(toggleOpenModalOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onClickOk method', () => {
    const onClickOkOnSpy = jest.spyOn(wrapper.instance(), 'onClickOk');
    wrapper.instance().onClickOk(global.event);
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
});
