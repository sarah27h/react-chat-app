import React, { Component } from 'react';

const Room = ({ roomName, roomId, subscribeToRoom }) => {
  return (
    <li className="room">
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
