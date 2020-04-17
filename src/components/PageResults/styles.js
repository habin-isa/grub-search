import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 80%;
  margin: 50px;
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
  color: #938f8f;
  padding-right: 30px;
`;

export const SimilarVenues = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  color: #938f8f;
  padding-bottom: 30px;
`;

export const Graph = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
`;

export const Subtitle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  color: #fa9629;
  font-weight: bold;
  padding-top: 5px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: none;
`;
