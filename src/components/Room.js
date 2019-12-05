import React, { Component } from 'react';

const Room = ({ roomName, roomId, subscribeToRoom, currentRoomId }) => {
  const active = currentRoomId === roomId ? 'active' : '';
  console.log(currentRoomId, roomId);
  return (
    <li className={`room ${active}`}>
      {/**  use arrow function in onClick when passing an arugment*/
      /**  handle user click on room to subscribe*/
      /** pass roomId as an action to <Main /> */}
      <a onClick={() => subscribeToRoom(roomId)} href="#">
        # {roomName}
      </a>
    </li>
  );
};

export default Room;
