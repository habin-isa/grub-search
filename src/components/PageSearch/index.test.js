import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import PageSearch from '.';

describe('PageSearch component', () => {
  const props = {
    handleSearchSubmit: () => {},
    handleSearchChange: () => {},
    userInput: {
      name: 'Kim',
      clientId: '123213',
      clientSecret: '123213'
    },
    inputError: 0
  };
  it('should render', () => {
    const { container } = render(<PageSearch {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('renders with correct userInput data', () => {
    shallow(<PageSearch userInput={props.userInput} />);
  });
});
