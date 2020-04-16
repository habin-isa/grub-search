import React, { useState, useEffect, useReducer } from 'react';
import ReactPageScroller from 'react-page-scroller';
import * as S from './styles';
import { getVenues, getSimilarVenues } from './services';
import PageTitle from '../PageTitle';
import PageSearch from '../PageSearch';
import PageResults from '../PageResults';

const App = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [venues, setVenues] = useState([]);
  const [similarVenues, setSimilarVenues] = useState([]);
  const [seedVenue, setSeedVenue] = useState();
  const [newVenues, setNewVenues] = useState([]);
  const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    name: '',
    clientId: '',
    clientSecret: ''
  });
  const [inputError, showInputError] = useState(0);
  const [stopChart, setStopChart] = useState(0);
  const [sortedData, setSortedData] = useState();
  const newData = {
    nodes: [],
    links: []
  };

  const topNodes = [];

  const handlePageChange = (number) => {
    setCurrentPage(number);
  };

  const loadVenues = async (name, clientId, clientSecret) => {
    try {
      const response = await getVenues(name, clientId, clientSecret);
      setVenues(response.data.response.venues);
    } catch (error) {
      console.log('error fetching venues');
      showInputError(1);
      setCurrentPage(1);
    } finally {
      console.log('loadVenues called');
    }
  };

  const loadSimilarVenues = async (venue) => {
    // pushes first venue
    topNodes.push({
      id: venue.name,
      venueId: venue.id
    });

    // calls getSimilar venue, pushes first response
    const rawFirstResponse = await getSimilarVenues(venue.id, userInput.clientId, userInput.clientSecret);
    const firstResponse = rawFirstResponse.data.response.similarVenues.items;
    {
      firstResponse.map((venue, i) => {
        topNodes.push({
          id: venue.name,
          venueId: venue.id
        });
      });
    }
    setSimilarVenues(firstResponse);

    // push links for first response
    for (var i = 1; i < topNodes.length; i++) {
      newData.links.push({
        source: venue.name,
        target: topNodes[i].id
      });
    }

    console.log('newData after 1st response', newData);

    for (i = 1; i < firstResponse.length + 1; i++) {
      // calls second response
      const similarVenueId = topNodes[i].venueId;
      const startVenue = topNodes[i].id;
      const rawSecondResponse = await getSimilarVenues(similarVenueId, userInput.clientId, userInput.clientSecret);
      const secondResponse = rawSecondResponse.data.response.similarVenues.items;

      {
        secondResponse.map((venue, i) => {
          topNodes.push({
            id: venue.name,
            venueId: venue.id
          });
          newData.links.push({
            source: startVenue,
            target: venue.name
          });
        });
      }

      console.log('topNodes', topNodes);
    }
    const flatNodes = topNodes.flat();
    newData.nodes = flatNodes;
    setSortedData(newData);
    console.log('newData after 2nd response', newData);
  };

  const renderedSimilarVenues = similarVenues.map((similarVenue, i) => <div key={i}>{similarVenue.name}</div>);

  const renderedVenues = venues.map((venue, i) => (
    <div
      key={i}
      onClick={() => {
        loadSimilarVenues(venue);
        setSeedVenue(venue);
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
    if (userInput.clientId !== '' && userInput.clientSecret !== '' && userInput.name !== '') {
      setCurrentPage(2);
      showInputError(0);
    }
    event.preventDefault();
  };

  useEffect(() => {
    document.body.onkeyup = (e) => {
      if (e.keyCode === 32) {
        setStopChart(1);
      }
    };
  });

  return (
    <S.Wrapper>
      <React.Fragment>
        <ReactPageScroller pageOnChange={handlePageChange} customPageNumber={currentPage}>
          <PageTitle />
          <PageSearch
            handleSearchSubmit={handleSearchSubmit}
            handleSearchChange={handleSearchChange}
            userInput={userInput}
            inputError={inputError}
          />
          <PageResults
            seedVenue={seedVenue}
            venues={venues}
            renderedVenues={renderedVenues}
            similarVenues={similarVenues}
            renderedSimilarVenues={renderedSimilarVenues}
            stopChart={stopChart}
            newVenues={newVenues.flat()}
            sortedData={sortedData}
          />
        </ReactPageScroller>
      </React.Fragment>
    </S.Wrapper>
  );
};

export default App;
