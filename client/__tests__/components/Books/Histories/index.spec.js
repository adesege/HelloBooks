import React from 'react';
import { shallow } from 'enzyme';
import Histories from 'components/Books/Histories';

const props = {
  title: '',
  config: {}
};

describe('# Histories', () => {
  const wrapper = shallow(<Histories {...props}/>);
  it('should render Histories component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.title').length).toBe(1);
  });
});
