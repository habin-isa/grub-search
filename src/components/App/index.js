import React, { useState, useReducer } from 'react';
import ReactPageScroller from 'react-page-scroller';
import * as S from './styles';
import { getVenues, getSimilarVenues } from './services';
import PageTitle from '../PageTitle';
import PageSearch from '../PageSearch';
import PageResults from '../PageResults';
// import { string } from 'prop-types';

const App = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [venues, setVenues] = useState([]);
  const [similarVenues, setSimilarVenues] = useState([]);
  const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    name: '',
    clientId: '',
    clientSecret: ''
  });

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };
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

  const renderedSimilarVenues = similarVenues.map((similarVenue, i) => <div key={i}>{similarVenue.name}</div>);

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

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setUserInput({ [name]: value });
  };

  const handleSearchSubmit = (event) => {
    loadVenues(userInput.name, userInput.clientId, userInput.clientSecret);
    setCurrentPage(2);
    event.preventDefault();
  };

  return (
    <S.Wrapper>
      <React.Fragment>
        <ReactPageScroller pageOnChange={handlePageChange} customPageNumber={currentPage}>
          <PageTitle />
          <PageSearch
            handleSearchSubmit={handleSearchSubmit}
            handleSearchChange={handleSearchChange}
            userInput={userInput}
          />
          <PageResults
            venues={venues}
            renderedVenues={renderedVenues}
            similarVenues={similarVenues}
            renderedSimilarVenues={renderedSimilarVenues}
          />
        </ReactPageScroller>
      </React.Fragment>
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
