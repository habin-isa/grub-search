import React from 'react';
import { shallow } from 'enzyme';
import PageTitle from '.';

describe('PageTitle component', () => {
  it('renders without crashing', () => {
    shallow(<PageTitle />);
  });
});
