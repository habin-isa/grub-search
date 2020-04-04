# Grub search

### Be burdened with choice

- Search for similar restaurants using FourSquare, displayed with a force graph powered by D3
- A user can enter FourSquare API credentials and a venue or category search
- A list of venues matching that search are returned
- The user can click on a venue to load a list of similar venues, and see the network of similar venues in a force graph

![alt text](/src/assets/project-preview.png 'Preview')

### Use the app

https://grub-search.herokuapp.com/

#### To run the project

- \$ git clone https://github.com/habin-isa/grub-search.git
- \$ cd grub-search
- \$ yarn
- \$ yarn run dev
- \$ yarn test

### To access the FourSquare API

To get access to the Foursquare API you need to create a developer account. Follow the steps in the [Foursquare docs](https://developer.foursquare.com/docs/api) to:

- Sign up
- Create an app (your app URL can be localhost)
- Obtain your client ID and secret

### Example FourSquare details

- ClientID: XDV5S2RADLC32ECWCUJAQ03C1MJTMBGDJ0IAVNWOPAJ1TFDE
- ClientSecret: 15SRCBBB2PKLBZ122MHUVY1DL4IMC4CG3DFCODZWIC0L40TU

![alt text](/src/assets/graph-preview.png 'Graph Preview')

### Tech

- React CLI
- Pretty-quick
- Styled components
- Jest
- Axios
- Babel/EsLint
- React-page-scroller
- Express
- Heroku
- D3
