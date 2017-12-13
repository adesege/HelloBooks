import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedNotifications, {
  Notifications
} from 'components//Notifications';

const notifications = [{
  id: 1,
  Book: {
    id: 1,
    title: 'Hello world',
    coverPhotoPath: ''
  }
}];

const props = {
  notifications,
  getNotifications: jest.fn(),
  pagination: {}
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  auth: {
    user: {
      userId: 1
    }
  },
  notifications: {
    notifications: [{
      id: 1
    }],
    pagination: { }
  }
});

describe('# Notifications', () => {
  const wrapper = shallow(<Notifications {...props}/>);
  wrapper.setState({ notifications });
  it('should render Notifications component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should call the componentWillReceiveProps method', () => {
    const componentWillReceivePropsSpy = jest
      .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    const nextProps = {
      notifications: [{
        ...notifications[0],
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

  it('should call the onFilterSubmit method', () => {
    const onFilterSubmitSpy = jest
      .spyOn(wrapper.instance(), 'onFilterSubmit');
    wrapper.instance().onFilterSubmit(global.event);
    expect(onFilterSubmitSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the handleInputChange method', () => {
    const newEvent = {
      ...global.event,
      target: {
        name: 'name',
        value: 'value'
      }
    };
    const handleInputChangeOnSpy = jest.spyOn(wrapper.instance(), 'handleInputChange');
    wrapper.instance().handleInputChange(newEvent);
    expect(handleInputChangeOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedNotifications
      {...props}
      store={store} />);
    expect(connectedComponent.length).toBe(1);
  });
});
