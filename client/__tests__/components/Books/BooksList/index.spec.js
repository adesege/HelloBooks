import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedBooksList, { BooksList } from 'components/Books/BooksList';

const categories = [{
  id: 1,
  name: 'Category 1'
}];

const props = {
  books: [],
  userGroup: '',
  goToEditPage: jest.fn(),
  confirmDelete: jest.fn(),
  pagination: {},
  handlePageChange: jest.fn(),
  getBooks: jest.fn(),
  getBookCategories: jest.fn(),
  categories: [],
};

const context = {
  context: {
    router: {
      push: jest.fn()
    }
  }
};

const state = {
  books: {
    books: [],
    pagination: {}
  },
  auth: {
    user: {
      group: ''
    }
  },
  categories: []
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  ...state
});

describe('# BooksList', () => {
  const wrapper = shallow(<BooksList {...props}/>, context);
  it('should render BooksList component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedBooksList
      {...props}
      store={store}
    />);
    expect(connectedComponent.length).toBe(1);
  });

  it('should call the componentWillReceiveProps method', () => {
    const componentWillReceivePropsSpy = jest.spyOn(
      wrapper.instance(),
      'componentWillReceiveProps'
    );
    const nextProps = {
      params: { id: 2 },
      books: '',
      categories,
      pagination: {}
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the goToEditPage method', () => {
    const goToEditPageOnSpy = jest.spyOn(wrapper.instance(), 'goToEditPage');
    wrapper.instance().goToEditPage(global.event);
    expect(goToEditPageOnSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the confirmDelete method', () => {
    const confirmDeleteOnSpy = jest.spyOn(wrapper.instance(), 'confirmDelete');
    wrapper.instance().confirmDelete(global.event);
    expect(confirmDeleteOnSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the handlePageChange method', () => {
    const handlePageChangeOnSpy = jest
      .spyOn(wrapper.instance(), 'handlePageChange');
    wrapper.instance().handlePageChange(global.event);
    expect(handlePageChangeOnSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the onSearchFilter method', () => {
    const onSearchFilterOnSpy = jest
      .spyOn(wrapper.instance(), 'onSearchFilter');
    wrapper.instance().onSearchFilter(global.event);
    expect(onSearchFilterOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onChangeInput method', () => {
    const newEvent = {
      ...global.event,
      target: {
        name: 'name',
        value: 'value'
      }
    };
    const onChangeInputOnSpy = jest.spyOn(wrapper.instance(), 'onChangeInput');
    wrapper.instance().onChangeInput(newEvent);
    expect(onChangeInputOnSpy).toHaveBeenCalledTimes(1);
  });
});
