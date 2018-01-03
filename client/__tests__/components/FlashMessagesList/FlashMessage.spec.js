import React from 'react';
import { shallow } from 'enzyme';
import FlashMessage from 'components/FlashMessagesList/FlashMessage';

const props = {
  message: {
    text: [],
    type: 'error'
  }
};

describe('# FlashMessage', () => {
  const wrapper = shallow(<FlashMessage {...props}/>);
  it('should render FlashMessage component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').length).toBe(1);
  });
});
