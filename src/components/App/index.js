import React, { useState } from 'react';
import * as S from './styles';
import { getVenues, getSimilarVenues } from './services';
// import { string } from 'prop-types';

const App = () => {
  const [queryVenue, setQueryVenue] = useState({
    name: '',
    clientId: ''
  });
  const [venues, setVenues] = useState([]);
  const [similarVenues, setSimilarVenues] = useState([]);
  const loadVenues = async (name) => {
    try {
      const response = await getVenues(name);
      setVenues(response.data.response.venues);
    } catch (error) {
      console.log('error fetching venues');
    } finally {
      console.log('loadVenues called');
    }
  };

  const loadSimilarVenues = async (id) => {
    try {
      const response = await getSimilarVenues(id);
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
    setQueryVenue((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    loadVenues(queryVenue.name);
    event.preventDefault();
  };

  return (
    <S.Wrapper>
      <form onSubmit={handleSubmit}>
        <label>
          Restaurant name:
          <input type="text" name="name" onChange={handleChange} value={queryVenue.name} />
        </label>
        <label>
          Foursqaure API Client ID:
          <input type="text" name="clientId" onChange={handleChange} value={queryVenue.clientId} />
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
