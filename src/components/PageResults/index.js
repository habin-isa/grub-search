import React from 'react';
import * as S from './styles';
import GraphContainer from '../GraphContainer';

const PageResults = ({ venues, renderedVenues, similarVenues, renderedSimilarVenues }) => {
  return (
    <S.Wrapper>
      <S.Venues>
        <S.VenuesTitle>Please select one venue to see similar spots</S.VenuesTitle>
        {venues.length === 0 ? '0 Results' : renderedVenues}
      </S.Venues>
      <S.SimilarVenues>
        <S.SimilarVenuesTitle>Details of similar venues:</S.SimilarVenuesTitle>
        <S.Venues>{similarVenues.length === 0 ? 'No results for similar venues' : renderedSimilarVenues}</S.Venues>
      </S.SimilarVenues>
      <S.Graph>
        {' '}
        <GraphContainer similarVenues={similarVenues} />
      </S.Graph>
    </S.Wrapper>
  );
};

export default PageResults;
