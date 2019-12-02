import React, { Component } from 'react';

const Room = ({ roomName }) => {
  return (
    <li className="room">
      <a href="#"># {roomName}</a>
    </li>
  );
};

export default Room;
