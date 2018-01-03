import React from 'react';
import { shallow } from 'enzyme';
import List from 'components/Notifications/List';

const props = {
  notifications: [{
    id: 1,
    title: '',
    updatedAt: '',
    notificationType: '',
    Book: {
      author: ''
    },
    User: {
      name: ''
    }
  }],
  pagination: {},
  handlePageChange: jest.fn(),
  isPagination: true
};

describe('# List', () => {
  const wrapper = shallow(<List {...props}/>);
  it('should render Notification List component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper.find('.title').length).toBe(1);
  });

  it('should render Empty message component', () => {
    wrapper.setProps({ notifications: [] });
    expect(wrapper).toBeDefined();
    expect(wrapper.find('EmptyMessage').length).toBe(1);
  });
});
