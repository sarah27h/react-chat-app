import React from 'react';

const Room = ({ roomName, roomId, subscribeToRoom, currentRoomId }) => {
  const active = currentRoomId === roomId ? 'active' : '';
  return (
    <li className={`room ${active}`}>
      {/**  use arrow function in onClick when passing an arugment*/
      /**  handle user click on room to subscribe*/
      /** pass roomId as an action to <Main /> 
      use <button> instead of <a>
      https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md*/}
      <button onClick={() => subscribeToRoom(roomId)}># {roomName}</button>
    </li>
  );
};

export default Room;
