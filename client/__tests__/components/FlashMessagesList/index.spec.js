import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import ConnectedFlashMessagesList, {
  FlashMessagesList
} from 'components/FlashMessagesList';

const notifications = [{
  id: 1,
  Book: {
    id: 1,
    title: 'Hello world',
    coverPhotoPath: ''
  }
}];

const props = {
  message: {},
  deleteFlashMessageAction: jest.fn()
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  flashMessages: {}
});

describe('# Notifications', () => {
  const wrapper = shallow(<FlashMessagesList {...props}/>);
  wrapper.setState({ notifications });
  it('should render Notifications component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('SetTimeout').length).toBe(1);
  });

  it('should call the componentWillUnmount method', () => {
    const componentWillUnmountSpy = jest
      .spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.instance().componentWillUnmount();
    expect(componentWillUnmountSpy).toHaveBeenCalledTimes(1);
  });

  it('should render the connected component', () => {
    const connectedComponent = shallow(<ConnectedFlashMessagesList
      {...props}
      store={store} />);
    expect(connectedComponent.length).toBe(1);
  });
});
