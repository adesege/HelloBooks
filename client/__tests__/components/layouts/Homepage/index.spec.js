import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import ConnectedHomepage, { 
  Homepage
} from 'components/layouts/Homepage';
import configureMockStore from 'redux-mock-store';


jest.mock('react-router');

const props = {
  isAuthenticated: true,
  children: <div/>,
  location: { pathname: {} },
};

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  auth: {
    user: {
      userId: 1
    }
  }
});
let wrapper;

describe('# Homepage Layout', () => {
  wrapper = shallow(
      <Homepage 
      {...props} 
      />, {
    context: {
      router: {
        push: jest.fn()
      }
    }
  });
  it('should render Homepage component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('section').length).toBe(1);
  });

  it('should render Homepage component with background image when user is not authenticated', () => {
    wrapper.setProps({ isAuthenticated: false })
    expect(wrapper).toBeDefined();
    expect(wrapper.find('section').length).toBe(1);
  });

  it('should render ConnectedHomepage component with background image when user is not authenticated', () => {
    wrapper = shallow(
      <ConnectedHomepage 
      {...props} 
      store={store}
      />, {
    context: {
      router: {
        push: jest.fn()
      }
    }
  });
    expect(wrapper).toBeDefined();
    expect(wrapper.length).toBe(1);
  });
});
