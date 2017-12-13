import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from 'components/Dashboard';

const props = {
  message: {
    text: [],
    type: 'error'
  }
};

describe('# Dashboard', () => {
  const wrapper = shallow(<Dashboard {...props}/>);
  it('should render Dashboard component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.title').length).toBe(1);
  });
});
