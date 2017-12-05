import React from 'react';
import { shallow } from 'enzyme';
import {
  Router,
  browserHistory } from 'react-router';
import Homepage from 'components/layouts/Homepage';
import { Provider } from 'react-redux';
import store from '../../../../src/store';


jest.mock('react-router');

const props = {
  isAuthenticated: true,
  children: <div/>,
  location: { pathname: {} },
};

describe('# Homepage Layout', () => {
  const wrapper = shallow(<Provider store={store}>
    <Router history={browserHistory}>
      <Homepage {...props} />
    </Router>
  </Provider>, {
    context: {
      router: {
        push: jest.fn()
      }
    }
  });
  it('should render Homepage component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find(Homepage).length).toBe(1);
    expect(wrapper.find(Router).length).toBe(1);
  });
});
