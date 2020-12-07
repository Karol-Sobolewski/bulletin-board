import React from 'react';
import { shallow } from 'enzyme';
import { PostFormComponent } from './PostForm';

describe('Component PostForm', () => {
  it('should render without crashing', () => {
    const component = shallow(<PostFormComponent />);
    expect(component).toBeTruthy();
  });
});
