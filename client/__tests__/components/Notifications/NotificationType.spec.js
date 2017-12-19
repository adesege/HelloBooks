import React from 'react';
import { shallow } from 'enzyme';
import NotificationType from 'components/Notifications/NotificationType';

const props = {
  type: 'BOOK_BORROWED'
};

describe('# NotificationType', () => {
  const wrapper = shallow(<NotificationType {...props}/>);
  it('should render BOOK_BORROWED button', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.text-info').length).toBe(1);
  });

  it('should render BOOK_RETURNED button', () => {
    wrapper.setProps({ type: 'BOOK_RETURNED' });
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.text-success').length).toBe(1);
  });

  it('should render BOOK_SURCHARGED button', () => {
    wrapper.setProps({ type: 'BOOK_SURCHARGED' });
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.btn-warning').length).toBe(1);
  });

  it('should not render notification type button', () => {
    wrapper.setProps({ type: '' });
    expect(wrapper).toBeDefined();
    expect(wrapper.find('div').length).toBe(1);
  });
});
