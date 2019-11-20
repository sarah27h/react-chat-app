import React, { Component } from 'react';

class NewRoomForm extends Component {
  render() {
    return (
      <div className="new-room-form">
        <form>
          <input type="text" placeholder="Create a room" />
          <button>+</button>
        </form>
      </div>
    );
  }
}

export default NewRoomForm;
