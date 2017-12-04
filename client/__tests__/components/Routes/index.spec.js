import React from 'react';
import { shallow } from 'enzyme';
import Routes from '../../../src/Routes';

jest.mock('react-router');

describe('# Routes', () => {
  it('should render application routes', () => {
    const wrapper = shallow(<Routes />);
    expect(wrapper).toBeDefined();
  });
});
