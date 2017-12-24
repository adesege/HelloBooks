import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedShowStock, 
{ 
  ShowStock
} from 'components/Books/StockManager/ShowStock';

const props = {
  params: {
    id: 2
  },
  stocks: [{
    book: {
      title: 'title'
    }
  }],
  getStockByBookIdAction: jest.fn(),
  addStockAction: jest.fn(() => Promise.resolve()),
  deleteStockAction: jest.fn(() => Promise.resolve()),
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
  stocks: {}
});

describe('# ShowStock', () => {
  const wrapper = shallow(<ShowStock {...props}/>, context);
  it('should render ShowStock component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should call the componentWillReceiveProps method', () => {
    const componentWillReceivePropsSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    const nextProps = {
      stocks: [{
        book: {
          title: 'title'
        }
      }]
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the toggleOpenAddModal method', () => {
    const toggleOpenAddModalOnSpy = jest
      .spyOn(wrapper.instance(), 'toggleOpenAddModal');
    wrapper.instance().toggleOpenAddModal();
    expect(toggleOpenAddModalOnSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the onDeleteModal method', () => {
    const onDeleteModalOnSpy = jest
      .spyOn(wrapper.instance(), 'onDeleteModal');
    wrapper.instance().onDeleteModal(global.event);
    expect(onDeleteModalOnSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the onSubmit method', () => {
    const onSubmitOnSpy = jest.spyOn(wrapper.instance(), 'onSubmit');
    wrapper.instance().onSubmit(global.event);
    expect(onSubmitOnSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the onDeleteSubmit method', () => {
    const onDeleteSubmitOnSpy = jest
      .spyOn(wrapper.instance(), 'onDeleteSubmit');
    wrapper.instance().onDeleteSubmit(global.event);
    expect(onDeleteSubmitOnSpy).toHaveBeenCalledTimes(1);
  });
  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedShowStock 
      {...props} 
      store={store} />);
    expect(connectedComponent.length).toBe(1);
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
