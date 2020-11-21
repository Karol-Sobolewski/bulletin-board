import React from 'react';
import { shallow } from 'enzyme';
import { Posts } from './PostAll';

describe('Component PostAll', () => {
  it('should render without crashing', () => {
    const component = shallow(<Posts />);
    expect(component).toBeTruthy();
  });
});
