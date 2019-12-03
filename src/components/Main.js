import React, { Component } from 'react';
import MessageList from './MessageList';
import RoomList from './RoomList';
import NewRoomForm from './NewRoomForm';
import SendMessageForm from './SendMessageForm';
import { tokenUrl, chatkitInstanceLocator } from '../config/config';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

class Main extends Component {
  state = {
    messages: [],
    joinableRooms: [],
    joinedRooms: []
  };

  sendMessageToChatkit = message => {
    this.currentUser
      .sendSimpleMessage({
        roomId: 'b612162c-ade2-4c7c-9e23-41a249c88912',
        text: message
      })
      .then(messageId => {
        console.log(`Message is added`);
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });
  };

  subscribeToRoom = () => {
    this.currentUser.subscribeToRoomMultipart({
      roomId: 'b612162c-ade2-4c7c-9e23-41a249c88912',
      hooks: {
        onMessage: message => {
          console.log('received message', message, message.parts[0].payload.content);
          this.setState({ messages: [...this.state.messages, message] });
        }
      },
      messageLimit: 10
    });
  };

  getRooms = () => {
    this.currentUser
      .getJoinableRooms()
      .then(rooms => {
        this.setState({
          joinableRooms: rooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => {
        console.log(`Error getting joinable rooms: ${err}`);
      });
  };

  // hook our app with chatkit API
  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: chatkitInstanceLocator,
      userId: 'salma',
      tokenProvider: new TokenProvider({ url: tokenUrl })
    });

    // connect with chatkit, fetch data from it
    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.getRooms();
        console.log('Successful connection', currentUser);
        this.subscribeToRoom();
      })
      .catch(err => {
        console.log('Error on connection', err);
      });
  }
  render() {
    console.log(this.state);
    return (
      <div className="app">
        <MessageList messages={this.state.messages} />
        <RoomList joinedRooms={this.state.joinedRooms} joinableRooms={this.state.joinableRooms} />
        <NewRoomForm />
        <SendMessageForm sendMessage={this.sendMessageToChatkit} />
      </div>
    );
  }
}

export default Main;
