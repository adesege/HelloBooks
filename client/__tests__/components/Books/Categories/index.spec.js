import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedCategories, { Categories } from 'components/Books/Categories';

const props = {
  addFlashMessage: jest.fn(),
  addBookCategoryAction: jest.fn(),
  getBookCategoriesAction: jest.fn(),
  editBookCategoryAction: jest.fn(),
  deleteBookCategoryAction: jest.fn(),
  bookCategories: []
};

const bookCategories = [{
  id: 1,
  name: 'Category name'
}];


const mockStore = configureMockStore([thunk]);
const store = mockStore({});

describe('# Categories', () => {
  const wrapper = shallow(<Categories {...props}/>);

  it('should render Categories component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
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

  it('should call the onSubmit method', () => {
    const onSubmitOnSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    wrapper.instance().onSubmit(global.event);
    expect(onSubmitOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onDeleteSubmit method', () => {
    const onDeleteSubmitOnSpy = jest.spyOn(wrapper.instance(), 'onDeleteSubmit');
    wrapper.instance().onDeleteSubmit(global.event);
    expect(onDeleteSubmitOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onDeleteModal method', () => {
    const onDeleteModalOnSpy = jest.spyOn(wrapper.instance(), 'onDeleteModal');
    wrapper.instance().onDeleteModal(global.event);
    expect(onDeleteModalOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the componentWillReceiveProps method', () => {
    const componentWillReceivePropsSpy = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
    const nextProps = {
      bookCategories,
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onEditClick method', () => {
    const onEditClickOnSpy = jest.spyOn(wrapper.instance(), 'onEditClick');
    wrapper.instance().onEditClick(global.event);
    expect(onEditClickOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedCategories {...props} store={store} />);
    expect(connectedComponent.length).toBe(1);
  });
});
