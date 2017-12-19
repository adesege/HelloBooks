import React from 'react';
import { shallow } from 'enzyme';
import Body from 'components/Modal/Body';

const props = {
  children: {}
};

describe('# Body component', () => {
  const wrapper = shallow(<Body {...props}/>);

  it('should render Body component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('ModalBody').length).toBe(1);
  });
});
