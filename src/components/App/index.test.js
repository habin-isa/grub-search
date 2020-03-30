import React from 'react';
import { shallow } from 'enzyme';
import App from '.';

describe('Main App component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});
