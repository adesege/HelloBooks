import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedSearchStock, { 
  SearchStock
} from 'components/Books/StockManager/SearchStock';

const props = {
  searchBooksAction: jest.fn(),
  addFlashMessage: jest.fn(),
  searchResult: []
};

const searchResult = [{
  id: 1,
  title: 'Book title'
}];

const context = {
  context: {
    router: {
      push: jest.fn()
    }
  }
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  books: {
    books: []
  }
});

describe('# SearchStock', () => {
  const wrapper = shallow(<SearchStock {...props}/>, context);

  it('should render SearchStock component', () => {
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

  it('should call the onSelect method', () => {
    const onSelectOnSpy = jest.spyOn(wrapper.instance(), 'onSelect');
    wrapper.instance().onSelect('0000-00-00', 2);
    expect(onSelectOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the componentWillReceiveProps method', () => {
    const componentWillReceivePropsSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    const nextProps = {
      searchResult,
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedSearchStock 
      {...props} 
      store={store} />, context);
    expect(connectedComponent.length).toBe(1);
  });
});
