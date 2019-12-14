import React from 'react';
import HamburgIcon from './HamburgIcon/HamburgIcon.js';

const RoomHeader = ({ currentRoomName, currentRoomId, handleHamburgerClick, messageFullArea }) => {
  const fixed = messageFullArea ? 'fixed' : '';
  if (currentRoomId) {
    return (
      <header className={`room-header ${fixed}`}>
        <HamburgIcon handleHamburgerClick={handleHamburgerClick} />
        <h1>{currentRoomName}</h1>
      </header>
    );
  } else return null;
};

export default RoomHeader;
