import React, { useState, useReducer } from 'react';
import * as S from './styles';
import { getVenues, getSimilarVenues } from './services';
// import { string } from 'prop-types';

const App = () => {
  const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    name: '',
    clientId: '',
    clientSecret: ''
  });
  const [venues, setVenues] = useState([]);
  const [similarVenues, setSimilarVenues] = useState([]);

  const loadVenues = async (name, clientId, clientSecret) => {
    try {
      const response = await getVenues(name, clientId, clientSecret);
      setVenues(response.data.response.venues);
    } catch (error) {
      console.log('error fetching venues');
    } finally {
      console.log('loadVenues called');
    }
  };

  const loadSimilarVenues = async (id) => {
    try {
      const response = await getSimilarVenues(id, userInput.clientId, userInput.clientSecret);
      setSimilarVenues(response.data.response.similarVenues.items);
    } catch (error) {
      console.log('error fetching similar venues');
    } finally {
      console.log('loadSimilarVenues called');
    }
  };

  const renderedVenues = venues.map((venue, i) => (
    <div
      key={i}
      onClick={() => {
        loadSimilarVenues(venue.id);
      }}
    >
      {venue.name}
    </div>
  ));

  const renderedSimilarVenues = similarVenues.map((similarVenue, i) => <div key={i}>{similarVenue.name}</div>);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInput({ [name]: value });
  };

  const handleSubmit = (event) => {
    console.log(userInput);
    loadVenues(userInput.name, userInput.clientId, userInput.clientSecret);
    event.preventDefault();
  };

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
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
      </form>
      <div>{venues.length === 0 ? 'No results for venues' : renderedVenues}</div>
      <div>{similarVenues.length === 0 ? 'No results for similar venues' : renderedSimilarVenues}</div>
    </S.Wrapper>
  );
};

export default App;

// If props were drilled into App component
// E.g. const App = ({ propName, propTwo })

// App.propTypes = {
//   propName: string,
//   propTwo: string.isRequired
// };

// App.defaultProps = {
//   propName: 'Kimmy'
// };
