import React from 'react';
import './HamburgIcon.css';

const HamburgIcon = props => {
  return (
    <button
      aria-label="menu"
      id="menu"
      className="header_menu"
      onClick={props.handleHamburgerClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z" />
      </svg>
    </button>
  );
};

export default HamburgIcon;
// onClick={props.handleHamburgerClick}
