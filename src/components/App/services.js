import axios from 'axios';

const CLIENT_ID = 'XDV5S2RADLC32ECWCUJAQ03C1MJTMBGDJ0IAVNWOPAJ1TFDE';

const CLIENT_SECRET = '15SRCBBB2PKLBZ122MHUVY1DL4IMC4CG3DFCODZWIC0L40TU';

export const getVenues = async (venueName) => {
  const url = `https://api.foursquare.com/v2/venues/search?near=London&query=${venueName}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20200226`;
  const response = await axios.get(url);
  console.log(response.data.response.venues);
  return response;
};

export const getSimilarVenues = async (venueId) => {
  const url = `https://api.foursquare.com/v2/venues/${venueId}/similar?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=20200226`;
  const response = await axios.get(url);
  console.log(response.data.response.similarVenues.items);
  return response;
};

// Take query
// Store Client_id in env
// Store Client_secret in env

// axios post with query
// look at react input packages

// - render initial venues
// - click venue -> take as query for getSimilarVenues(venue);
// - render similar venues

// - then add input functionality for initial getVenues param
