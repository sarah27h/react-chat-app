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
    const { joinedRooms, joinableRooms, subscribeToRoom } = this.props;

    const joinedUserRooms = joinedRooms.map(room => {
      return (
        <Room
          roomName={room.name}
          roomId={room.id}
          key={room.id}
          subscribeToRoom={subscribeToRoom}
        />
      );
    });

    const joinableUserRooms = joinableRooms.map(room => {
      return (
        <Room
          roomName={room.name}
          roomId={room.id}
          key={room.id}
          subscribeToRoom={subscribeToRoom}
        />
      );
    });
    return (
      <div className="rooms-list">
        <h3>Your Rooms</h3>
        {joinedUserRooms.length === 0 ? <p>Click to join rooms</p> : <ul>{joinedUserRooms}</ul>}

        <h3>Rooms to join</h3>
        {joinableUserRooms.length === 0 ? <p>No new rooms yet</p> : <ul>{joinableUserRooms}</ul>}
      </div>
    );
  }
}

export default RoomList;
