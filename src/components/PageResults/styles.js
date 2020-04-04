import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 50px;
  height: 80vh;
  // height: calc(var(--vh, 1vh) * 100);
`;
export const VenuesTitle = styled.div`
  font-size: 20px;
  color: #333;
  padding-bottom: 30px;
`;

export const Venues = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  cursor: pointer;
  width: 50%;
`;

export const SimilarVenuesTitle = styled.div`
  font-size: 20px;
  color: #666464;
  padding-right: 30px;
`;

export const SimilarVenues = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: #666464;
  padding-bottom: 30px;
`;

export const Graph = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
