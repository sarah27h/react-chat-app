import React, { Component } from 'react';
import Room from './Room';

class RoomList extends Component {
  render() {
    const { joinedRooms, joinableRooms, subscribeToRoom, currentRoomId } = this.props;

    const joinedUserRooms = joinedRooms
      .sort((a, b) => {
        return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1; // toUpperCase() to ignore upper and lowercase
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

    const joinableUserRooms = joinableRooms
      .sort((a, b) => {
        return a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1; // toUpperCase() to ignore upper and lowercase
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
        <h2>Your Rooms</h2>
        {joinedUserRooms.length === 0 ? <p>Click to join rooms</p> : <ul>{joinedUserRooms}</ul>}

        <h2>Rooms to join</h2>
        {joinableUserRooms.length === 0 ? <p>No new rooms yet</p> : <ul>{joinableUserRooms}</ul>}
      </div>
    );
  }
}

export default RoomList;
