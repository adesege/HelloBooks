import React from 'react';
import { shallow } from 'enzyme';
import BookComment from 'components/Books/ViewBooks/BookComment';

const props = {
  title: '',
  config: {}
};

describe('# BookComment', () => {
  const wrapper = shallow(<BookComment {...props}/>);
  it('should render BookComment component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').length).toBe(1);
  });
});
