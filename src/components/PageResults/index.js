import React from 'react';
import * as S from './styles';
import GraphContainer from '../GraphContainer';
import { array } from 'prop-types';

const PageResults = ({ venues, renderedVenues, similarVenues, renderedSimilarVenues }) => {
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
  renderedSimilarVenues: array
};

PageResults.defaultProps = {
  venues: [],
  renderedVenues: [],
  similarVenues: [],
  renderedSimilarVenues: []
};

export default PageResults;
