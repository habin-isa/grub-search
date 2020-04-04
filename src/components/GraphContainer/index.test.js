import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import GraphContainer from '.';

describe('GraphContainer', () => {
  const props = {
    similarVenues: [
      { id: 'Costa', group: '1' },
      { id: 'Costa', group: '1' },
      { id: 'Costa', group: '1' }
    ]
  };
  it('should render', () => {
    const { container } = render(<GraphContainer {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
