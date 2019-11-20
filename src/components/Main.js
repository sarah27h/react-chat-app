import React, { Component } from 'react';
import MessageList from './MessageList';
import RoomList from './RoomList';
import NewRoomForm from './NewRoomForm';
import SendMessageForm from './SendMessageForm';

class Main extends Component {
  render() {
    return (
      <div className="app">
        <MessageList />
        <RoomList />
        <NewRoomForm />
        <SendMessageForm />
      </div>
    );
  }
}

export default Main;
