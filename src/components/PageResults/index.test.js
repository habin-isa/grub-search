import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import PageResults from '.';

describe('PageResults component', () => {
  const props = {
    venues: [
      { id: 'Costa', group: '1' },
      { id: 'Costa', group: '1' },
      { id: 'Costa', group: '1' }
    ],
    similarVenues: [
      { id: 'Costa', group: '1' },
      { id: 'Costa', group: '1' },
      { id: 'Costa', group: '1' }
    ],
    renderedVenues: [],
    renderedSimilarVenues: [],
    stopChart: 0
  };
  it('should render', () => {
    const { container } = render(<PageResults {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  it('renders with correct venues data', () => {
    shallow(<PageResults venues={props.venues} />);
  });
  it('renders with correct similarVenues data', () => {
    shallow(<PageResults similarVenues={props.similarVenues} />);
  });
});
