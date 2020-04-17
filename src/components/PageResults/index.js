import React from 'react';
import * as S from './styles';
import GraphContainer from '../GraphContainer';
import { array, object, number } from 'prop-types';

const PageResults = ({ venues, renderedVenues, initialData, stopChart }) => {
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
              ? 'Click venue to render similar places'
              : initialData.firstResponse.map((venue, i) => <div key={i}>{venue.id}</div>)}
          </S.Venues>
          <S.Venues>{stopChart === 1 ? 'Render stopped' : 'Space bar to stop render'}</S.Venues>
          <S.Box>
            <S.Venues>Graph powered by d3</S.Venues>
            <S.Subtitle>Click any node to keep expanding graph</S.Subtitle>
          </S.Box>
        </S.SimilarVenues>{' '}
        <GraphContainer initialData={initialData} stopChart={stopChart} />
      </S.Graph>
    </S.Wrapper>
  );
};

PageResults.propTypes = {
  venues: array,
  renderedVenues: array,
  initialData: object,
  stopChart: number
};

PageResults.defaultProps = {
  venues: [],
  renderedVenues: [],
  initialData: {},
  stopChart: 0
};

export default PageResults;
