import React from 'react';
import { shallow } from 'enzyme';
import Header from 'components/Modal/Header';

const props = {
  title: '',
  headerOptions: [<h1/>]
};

describe('# Header component', () => {
  const wrapper = shallow(<Header {...props}/>);

  it('should render Header component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.getElement().type).toBe('div');
  });
});
