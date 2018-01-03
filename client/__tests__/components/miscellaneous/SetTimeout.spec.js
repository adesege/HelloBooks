import React from 'react';
import { shallow } from 'enzyme';
import SetTimeout from 'components/miscellaneous/SetTimeout';

const props = {
  children: <div/>,
  interval: 1000
};
describe('# SetTimeout', () => {
  const wrapper = shallow(<SetTimeout {...props}/>);
  it('should render SetTimeout component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should call the componentWillReceiveProps method', () => {
    const componentWillReceivePropsSpy = jest
    .spyOn(wrapper.instance(), 'componentWillReceiveProps');
    const nextProps = {
      children: <h1/>
    };
    wrapper.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalledTimes(1);
  });
  it('should call the componentWillUnmount method', () => {
    const componentWillUnmountSpy = jest
    .spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.instance().componentWillUnmount();
    expect(componentWillUnmountSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the setTimer method and '+
  'render the child component when isVisible is true.', () => {
    const setTimerOnSpy = jest.spyOn(wrapper.instance(), 'setTimer');
    wrapper.instance().setTimer();
    expect(setTimerOnSpy).toHaveBeenCalledTimes(1);
  });

  it('should call the setTimer method and '+
  'render a span when isVisible is false.', () => {
    wrapper.setState({ isVisible: false });
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('span');
  });
});
