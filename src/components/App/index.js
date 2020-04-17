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
  const [initialData, setInitialData] = useState();
  const newData = {
    nodes: [],
    links: []
  };

  const topNodes = {
    seed: [],
    firstResponse: [],
    secondResponse: []
  };

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
    // pushes seed venue into topNodes.seed
    topNodes.seed.push({
      id: venue.name,
      venueId: venue.id
    });

    // calls getSimilar venue (A), response gives B and C
    // push first response into topNodes.firstResponse
    const rawFirstResponse = await getSimilarVenues(
      topNodes.seed[0].venueId,
      userInput.clientId,
      userInput.clientSecret
    );
    const firstResponse = rawFirstResponse.data.response.similarVenues.items;

    {
      firstResponse.map((venue) => {
        topNodes.firstResponse.push({
          id: venue.name,
          venueId: venue.id
        });
      });
    }

    // pushes links for seed -> firstResponse nodes
    // doesn't need to be fed to chart
    for (var i = 0; i < topNodes.firstResponse.length; i++) {
      newData.links.push({
        source: topNodes.seed[0],
        target: topNodes.firstResponse[i]
      });
    }
    // setSimilarVenues(topNodes.firstResponse);

    for (var k = 0; k < topNodes.firstResponse.length; k++) {
      const rawSecondResponse = await getSimilarVenues(
        topNodes.firstResponse[k].venueId,
        userInput.clientId,
        userInput.clientSecret
      );
      const secondResponse = rawSecondResponse.data.response.similarVenues.items;
      const res = [];
      {
        secondResponse.map((venue) => {
          res.push({
            id: venue.name,
            venueId: venue.id
          });
        });
      }
      topNodes.secondResponse.push(res);
    }
    setInitialData(topNodes);
  };

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
            stopChart={stopChart}
            newVenues={newVenues.flat()}
            sortedData={sortedData}
            initialData={initialData}
          />
        </ReactPageScroller>
      </React.Fragment>
    </S.Wrapper>
  );
};

export default App;
