import React from 'react';
import { shallow } from 'enzyme';
import Content from 'components/layouts/Dashboard/Content';
import Footer from 'components/layouts/Dashboard/Footer';
import Header from 'components/layouts/Dashboard/Header';
import Menu from 'components/layouts/Dashboard/Menu';
import NotificationsList from 'components/layouts/Dashboard/NotificationsList';
import NavigationLinks from 'components/layouts/Dashboard/NavigationLinks';
import EmptyMessage from 'components/miscellaneous/EmptyMessage';
import FlashMessagesList from 'components/flash/FlashMessagesList';

const props = {
  children: <div/>,
  isAuthenticated: true,
  user: {},
  logout: jest.fn(),
  group: '',
  auth: {},
  navigationLinks: {},
  notifications: [{
    User: {
      name: 'User\'s name'
    },
    Book: {
      title: 'Book title'
    },
    notificationType: 'BOOK_BORROWED'
  }],
  isPagination: true,
  isOpen: true,
  isDropdownOpen: false,
  isNotificationDropdownOpen: false,
  isNewNotification: false,
  toggleDropdown: jest.fn(),
  toggleNotificationDropdown: jest.fn(),
  menuNotifications: []

};

describe('# Dashboard Layout', () => {
  it('should render Content component', () => {
    const contentWrapper = shallow(<Content {...props} />);
    expect(contentWrapper).toBeDefined();
    expect(contentWrapper.find(FlashMessagesList).length).toBe(1);
    expect(contentWrapper.find('#contentArea').length).toBe(1);
  });

  it('should render Footer component', () => {
    const footerWrapper = shallow(<Footer {...props} />);
    expect(footerWrapper).toBeDefined();
    expect(footerWrapper.find('div').length).toBe(1);
  });

  it('should render Header component when notificationType is BOOK_BORROWED', () => {
    const headerWrapper = shallow(<Header {...props} />);
    expect(headerWrapper).toBeDefined();
    expect(headerWrapper.shallow(Menu).setProps(props).length).toBe(1);
  });
  describe('NotificationList', () => {
    it('should render NotificationList component', () => {
      const notificationListWrapper = shallow(<NotificationsList {...props} />);
      expect(notificationListWrapper).toBeDefined();
      expect(notificationListWrapper.shallow(Menu).setProps(props).length).toBe(1);
    });

    it('should render NotificationList component when notificationType is BOOK_RETURNED', () => {
      const newNotificationListProps = {
        ...props,
        notifications: [{
          ...props.notifications[0],
          notificationType: 'BOOK_RETURNED'
        }]
      };
      const notificationListWrapper = shallow(<NotificationsList {...newNotificationListProps} />);
      expect(notificationListWrapper).toBeDefined();
      expect(notificationListWrapper.shallow(Menu).setProps(props).length).toBe(1);
    });

    it('should render NotificationList component when notificationType is not set', () => {
      const newNotificationListProps = {
        ...props,
        notifications: [{
          ...props.notifications[0],
          notificationType: ''
        }]
      };
      const notificationListWrapper = shallow(<NotificationsList {...newNotificationListProps} />);
      expect(notificationListWrapper).toBeDefined();
      expect(notificationListWrapper.shallow(Menu).setProps(props).length).toBe(1);
    });

    it('should render EmptyMessage component if no notification can be found', () => {
      const newNotificationListProps = {
        ...props,
        notifications: []
      };
      const notificationListWrapper = shallow(<NotificationsList {...newNotificationListProps} />);
      expect(notificationListWrapper).toBeDefined();
      expect(notificationListWrapper.find(EmptyMessage).length).toBe(1);
    });
  });
  it('should render NavigationLinks component', () => {
    const navigationLinksWrapper = shallow(<NavigationLinks {...props} />);
    expect(navigationLinksWrapper).toBeDefined();
    expect(navigationLinksWrapper.find('Collapse').length).toBe(1);
  });
});
