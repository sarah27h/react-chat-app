import React, { Component } from 'react';

class Room extends Component {
  render() {
    const { roomName } = this.props;
    return (
      <li className="room">
        <a href="#"># {roomName}</a>
      </li>
    );
  }
}

export default Room;
