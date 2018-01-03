import React from 'react';
import { shallow } from 'enzyme';
import EmptyMessage from 'components/miscellaneous/EmptyMessage';

const props = {
  children: <div/>,
  interval: 1000
};
describe('# EmptyMessage', () => {
  const wrapper = shallow(<EmptyMessage {...props}/>);
  it('should render EmptyMessage component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });
});
