import React from 'react';

import './styles.css';

const PageTitle = () => {
  return (
    <div className="container">
      <h1>
        <span className="animation">
          <span className="first">grub</span>
          <span className="layer">
            <span className="second">search</span>
          </span>
        </span>
      </h1>
      <span className="third">Be burdened with choice</span>
    </div>
  );
};

export default PageTitle;
