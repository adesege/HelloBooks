import React from 'react';
import { shallow } from 'enzyme';
import Error from 'components/miscellaneous/Error';

describe('# Error', () => {
  const wrapper = shallow(<Error />);
  it('should render Error component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });
});
