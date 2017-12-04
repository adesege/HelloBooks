import React from 'react';
import { shallow } from 'enzyme';
import App from 'components/App';

jest.mock('react-router');

const props = {
  children: <div />
};

describe('# App', () => {
  const wrapper = () => shallow(<App {...props} />);
  it('should render App component', () => {
    expect(wrapper).toBeDefined();
    expect(wrapper().getElement().type).toBe('div');
    expect(wrapper().find('.loadingBar').length).toBe(1);
  });
});
