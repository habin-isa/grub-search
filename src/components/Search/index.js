import React from 'react';
import * as S from './styles';
import { string, objectOf, func } from 'prop-types';

const Search = ({ handleChange, handleSubmit, userInput }) => {
  return (
    <S.Wrapper onSubmit={handleSubmit}>
      <label>
        Foursquare API Client ID:
        <input type="text" name="clientId" onChange={handleChange} value={userInput.clientId} />
      </label>
      <label>
        Foursqaure API Client Secret:
        <input type="text" name="clientSecret" onChange={handleChange} value={userInput.clientSecret} />
      </label>
      <label>
        Restaurant name:
        <input type="text" name="name" onChange={handleChange} value={userInput.name} />
      </label>
      <input type="submit" value="Submit" />
    </S.Wrapper>
  );
};

Search.propTypes = {
  handleChange: func,
  handleSubmit: func,
  userInput: objectOf(string)
};

export default Search;
