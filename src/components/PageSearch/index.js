import React from 'react';
import * as S from './styles';
import FoodIcon from './assets/spaghetti.png';
import { array, func, obj } from 'prop-types';

const PageSearch = ({ handleSearchSubmit, handleSearchChange, userInput }) => {
  return (
    <S.Wrapper>
      <S.SearchContainer>
        <S.Title>Search for a restaurant or a category for your grub</S.Title>
        <S.Subtitle>
          To access the FourSquare API, create a developer account and obtain client credentials (ID and secret), from{' '}
          <S.Link href="https://developer.foursquare.com/docs/places-api/" target="_blank" rel="noopener noreferrer">
            here.
          </S.Link>
          <br />
          Out of ideas? Why not search for <i>Grill</i> or <i>Coffee!</i>
        </S.Subtitle>
        <S.SearchWrapper onSubmit={handleSearchSubmit}>
          <S.Label>
            Foursquare API Client ID:
            <S.Input type="text" name="clientId" onChange={handleSearchChange} value={userInput.clientId} />
          </S.Label>
          <S.Label>
            Foursqaure API Client Secret:
            <S.Input type="text" name="clientSecret" onChange={handleSearchChange} value={userInput.clientSecret} />
          </S.Label>
          <S.Label>
            Restaurant name:
            <S.Input type="text" name="name" onChange={handleSearchChange} value={userInput.name} />
          </S.Label>
          <S.SubmitContainer>
            <S.Submit type="submit" value="Submit" />
          </S.SubmitContainer>
        </S.SearchWrapper>
      </S.SearchContainer>
      <S.IconContainer>
        <S.Icon src={FoodIcon} alt="food-icon" />
      </S.IconContainer>
    </S.Wrapper>
  );
};

PageSearch.propTypes = {
  handleSearchSubmit: func,
  handleSearchChange: func,
  userInput: obj
};

PageSearch.defaultProps = {
  handleSearchSubmit: () => {},
  handleSearchChange: () => {},
  userInput: {}
};

export default PageSearch;
