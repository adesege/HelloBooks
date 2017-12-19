import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedList, { List } from 'components/Books/Histories/List';

const histories = [{
  id: 1,
  Book: {
    id: 1,
    title: 'Hello world',
    coverPhotoPath: ''
  }
}];

const props = {
  histories,
  userId: 1,
  getHistoriesAction: jest.fn(),
  isReturned: true,
  pagination: {}
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  auth: {
    user: {
      userId: 1
    }
  },
  histories: {
    histories: [{
      id: 1
    }],
    pagination: { }
  }
});

describe('# List', () => {
  const wrapper = shallow(<List {...props}/>);
  wrapper.setState({ histories });
  it('should render List component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should call the componentWillReceiveProps method', () => {
    const componentWillReceivePropsSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    const nextProps = {
      histories: [{
        ...histories[0],
        id: 2
      }],
      pagination: { limit: 10 }
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the handlePageChange method', () => {
    const handlePageChangeSpy = jest
      .spyOn(wrapper.instance(), 'handlePageChange');
    wrapper.instance().handlePageChange(1);
    expect(handlePageChangeSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the onSearchFilter method', () => {
    const onSearchFilterSpy = jest
      .spyOn(wrapper.instance(), 'onSearchFilter');
    wrapper.instance().onSearchFilter(global.event);
    expect(onSearchFilterSpy).toHaveBeenCalledTimes(1);
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

  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedList
      {...props}
      store={store} />);
    expect(connectedComponent.length).toBe(1);
  });
});
