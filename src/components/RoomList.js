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
    const { joinedRooms, joinableRooms, subscribeToRoom, currentRoomId } = this.props;

    const joinedUserRooms = joinedRooms
      .sort((a, b) => {
        return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
      })
      .map(room => {
        return (
          <Room
            roomName={room.name}
            roomId={room.id}
            key={room.id}
            subscribeToRoom={subscribeToRoom}
            currentRoomId={currentRoomId}
          />
        );
      });

    console.log(joinedUserRooms);
    const joinableUserRooms = joinableRooms
      .sort((a, b) => {
        return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1;
      })
      .map(room => {
        return (
          <Room
            roomName={room.name}
            roomId={room.id}
            key={room.id}
            subscribeToRoom={subscribeToRoom}
            currentRoomId={currentRoomId}
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
