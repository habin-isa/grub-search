import React from 'react';
import * as S from './styles';
import GraphContainer from '../GraphContainer';
import { array, number } from 'prop-types';

const PageResults = ({ venues, renderedVenues, similarVenues, renderedSimilarVenues, stopChart }) => {
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
          <S.Venues>{similarVenues.length === 0 ? 'No results for similar venues' : renderedSimilarVenues}</S.Venues>
          <S.Venues>
            {similarVenues.length === 1
              ? 'Only 1 similar venue'
              : similarVenues.length > 1
              ? 'Graph powered by d3'
              : ''}
          </S.Venues>
        </S.SimilarVenues>{' '}
        <GraphContainer similarVenues={similarVenues} />
      </S.Graph>
    </S.Wrapper>
  );
};

PageResults.propTypes = {
  venues: array,
  renderedVenues: array,
  similarVenues: array,
  renderedSimilarVenues: array,
  stopChart: number
};

PageResults.defaultProps = {
  venues: [],
  renderedVenues: [],
  similarVenues: [],
  renderedSimilarVenues: [],
  stopChart: 0
};

export default PageResults;
