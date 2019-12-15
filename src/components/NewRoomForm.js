import React, { Component } from 'react';

class NewRoomForm extends Component {
  state = {
    roomName: ''
  };

  handleChange = e => {
    this.setState({ roomName: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.creatRoom(this.state.roomName);
    this.setState({ roomName: '' });
  };

  render() {
    return (
      <div className="new-room-form">
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.roomName}
            type="text"
            aria-label="enter a room name"
            placeholder="Create a room"
            onChange={this.handleChange}
          />
          <button aria-label="add new room">+</button>
        </form>
      </div>
    );
  }
}

export default NewRoomForm;
