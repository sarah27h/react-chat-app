import React from 'react';

const RoomHeader = ({ currentRoomName, currentRoomId }) => {
  if (currentRoomId) {
    return (
      <header className="room-header">
        <h1>{currentRoomName}</h1>
      </header>
    );
  } else return null;
};

export default RoomHeader;
