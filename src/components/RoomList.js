import React, { Component } from 'react';
import Room from './Room';

const ROOMS_DUMMY_DATA = [
  {
    roomName: 'JS-newbies'
  },
  {
    roomName: 'random'
  }
];

class RoomList extends Component {
  render() {
    const { joinedRooms, joinableRooms } = this.props;

    const joinedUserRooms = joinedRooms.map((room, index) => {
      return <Room roomName={room.name} key={index} />;
    });

    const joinableUserRooms = joinableRooms.map((room, index) => {
      return <Room roomName={room.name} key={index} />;
    });
    return (
      <div className="rooms-list">
        <ul>
          <h3>Your Rooms</h3>
          {joinedUserRooms}
        </ul>
        <ul>
          <h3>Rooms to join</h3>
          {joinableUserRooms}
        </ul>
      </div>
    );
  }
}

export default RoomList;
