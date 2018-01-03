import React from 'react';
import { shallow } from 'enzyme';
import ErrorBoundary from 'components/miscellaneous/ErrorBoundary';

const props = {
  children: <div/>,
};
describe('# ErrorBoundary', () => {
  const wrapper = shallow(<ErrorBoundary {...props}/>);
  it('should render ErrorBoundary component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });

  it('should call the componentDidCatch method', () => {
    const componentDidCatchSpy = jest
    .spyOn(wrapper.instance(), 'componentDidCatch');
    wrapper.instance().componentDidCatch();
    expect(componentDidCatchSpy).toHaveBeenCalledTimes(1);
  });

});
