import axios from 'axios';

// const CLIENT_ID = 'XDV5S2RADLC32ECWCUJAQ03C1MJTMBGDJ0IAVNWOPAJ1TFDE';

// const CLIENT_SECRET = '15SRCBBB2PKLBZ122MHUVY1DL4IMC4CG3DFCODZWIC0L40TU';

export const getVenues = async (venueName, clientId, clientSecret) => {
  const url = `https://api.foursquare.com/v2/venues/search?near=London&query=${venueName}&client_id=${clientId}&client_secret=${clientSecret}&v=20200226`;
  const response = await axios.get(url);
  console.log(response.data.response.venues);
  return response;
};

export const getSimilarVenues = async (venueId, clientId, clientSecret) => {
  const url = `https://api.foursquare.com/v2/venues/${venueId}/similar?client_id=${clientId}&client_secret=${clientSecret}&v=20200226`;
  const response = await axios.get(url);
  console.log(response.data.response.similarVenues.items);
  return response;
};
