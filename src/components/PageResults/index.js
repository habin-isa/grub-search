import React from 'react';
import * as S from './styles';
import GraphContainer from '../GraphContainer';
import { array, object } from 'prop-types';

const PageResults = ({ venues, renderedVenues, initialData }) => {
  return (
    <S.Wrapper>
      <S.Venues>
        <S.VenuesTitle>Please select one venue to see similar spots</S.VenuesTitle>
        {venues.length === 0 ? '0 Results' : renderedVenues}
      </S.Venues>
      <S.Graph>
        {' '}
        <S.SimilarVenues>
          <S.SimilarVenuesTitle>Similar venues:</S.SimilarVenuesTitle>
          <S.Venues>
            {initialData.firstResponse === undefined
              ? 'No results for similar venues'
              : initialData.firstResponse.map((venue, i) => <div key={i}>{venue.id}</div>)}
          </S.Venues>
          <S.Venues>Graph powered by d3</S.Venues>
        </S.SimilarVenues>{' '}
        <GraphContainer initialData={initialData} />
      </S.Graph>
    </S.Wrapper>
  );
};

PageResults.propTypes = {
  venues: array,
  renderedVenues: array,
  initialData: object
};

PageResults.defaultProps = {
  venues: [],
  renderedVenues: [],
  initialData: {}
};

export default PageResults;
