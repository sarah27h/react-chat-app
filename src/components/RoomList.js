import React, { Component } from 'react';
import Room from './Room';

const ROOMS_DUMMY_DATA = [
  {
    roomName: 'JS-newbies'
  },
  {
    roomName: 'JS-help'
  },
  {
    roomName: 'random'
  }
];

class RoomList extends Component {
  render() {
    const rooms = ROOMS_DUMMY_DATA.map((room, index) => {
      return <Room roomName={room.roomName} key={index} />;
    });
    return (
      <div className="rooms-list">
        <ul>{rooms}</ul>
      </div>
    );
  }
}

export default RoomList;
