import React from 'react';

const RoomHeader = ({ currentRoomName }) => {
  return (
    <header class="room-header">
      <h1>{currentRoomName}</h1>
    </header>
  );
};

export default RoomHeader;
