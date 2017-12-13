import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import Menu from 'components/layouts/Dashboard/Menu';
import configureMockStore from 'redux-mock-store';


jest.mock('react-router');

const props = {
  auth: {},
  navigationLinks: {},
  logout: jest.fn()
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

describe('# Menu Layout', () => {
  wrapper = shallow(
      <Menu 
      {...props} 
      />, {
    context: {
      router: {
        push: jest.fn()
      }
    }
  });
  it('should render Menu component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('Navbar').length).toBe(1);
  });
});
