import React from 'react';
import { shallow } from 'enzyme';
import { PostBoardComponent } from './PostBoard';

describe('Component PostBoard', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostBoardComponent />);
    expect(component).toBeTruthy();
  });
});
