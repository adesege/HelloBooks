import React from 'react';
import { shallow } from 'enzyme';
import { AdminMiddleware } from 'components/middlewares/adminMiddleware';

const context = {
  context: {
    router: {
      push: jest.fn()
    }
  }
};

const customComponent = () => <div/>;
customComponent.displayName = 'CustomComponent';

const props = {
  composedComponent: customComponent,
  addFlashMessage: jest.fn(),
  isAuthenticated: true,
  group: 'user'
};

describe('# AdminMiddleware', () => {
  const wrapper = shallow(<AdminMiddleware
    {...props}
  />, context);
  it('should render AdminMiddleware component', () => {
    expect(wrapper.find('CustomComponent').length).toEqual(1);
  });

  it('should call the componentWillUpdate method', () => {
    const componentWillUpdateSpy = jest
    .spyOn(wrapper.instance(), 'componentWillUpdate');
    const nextProps = {
      isAuthenticated: false
    };
    wrapper.instance().componentWillUpdate(nextProps);
    expect(componentWillUpdateSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the componentDidMount method', () => {
    wrapper.setProps({ isAuthenticated: false });
    const componentDidMountSpy = jest
    .spyOn(wrapper.instance(), 'componentDidMount');
    const nextProps = {
      isAuthenticated: false
    };
    wrapper.instance().componentDidMount(nextProps);
    expect(componentDidMountSpy).toHaveBeenCalledTimes(1);
  });
});
