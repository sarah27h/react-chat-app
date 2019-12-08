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
    joinedRooms: [],
    currentRoomId: null,
    startMessage: 'Click a room to start chatting'
  };

  sendMessageToChatkit = message => {
    this.currentUser
      .sendSimpleMessage({
        roomId: this.state.currentRoomId,
        text: message
      })
      .catch(err => {
        console.log(`Error: ${err}`);
      });

    // this.fetchlastMessage();
  };

  subscribeToRoom = roomId => {
    console.log(roomId);
    this.setState({ currentRoomId: roomId, messages: [] }); // UX clean screen every time user click an new room
    this.currentUser
      .subscribeToRoomMultipart({
        roomId: roomId,
        hooks: {
          onMessage: message => {
            console.log('received message', message, message.parts[0].payload.content);
            this.setState({ startMessage: null, messages: [...this.state.messages, message] });
          }
        },
        messageLimit: 20
      })
      .then(room => {
        this.setState({
          currentRoomId: room.id
        });
        this.getRooms();
      })
      .catch(err => console.log('error on subscribing to room: ', err));
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

  fetchRoomMessages = roomId => {
    this.currentUser
      .fetchMultipartMessages({
        roomId,
        // initialId: 42,
        direction: 'older'
        // limit: 10
      })
      .then(messages => {
        this.setState({ messages });
      })
      .catch(err => {
        console.log(`Error fetching messages: ${err}`);
      });
  };

  fetchlastMessage = () => {
    this.currentUser
      .fetchMultipartMessages({
        roomId: this.state.currentRoomId
        // initialId: messageId
      })
      .then(messages => {
        const newMessage = messages[messages.length - 1];
        this.setState({ messages: [...this.state.messages, newMessage] });
        console.log(`Message is added, ${messages[messages.length - 1].parts[0].payload.content}`);
      });
  };

  // hook our app with chatkit API
  componentDidMount() {
    console.log('componentDidMount');
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
        // handle user is a member of the default room case before making the request to fetch room messages
        // for (const room of this.currentUser.rooms) {
        //   if (room.id === this.state.currentRoomId) {
        //     this.fetchRoomMessages(this.state.currentRoomId);
        //   }
        // }

        console.log('Successful connection', currentUser.rooms);
      })
      .catch(err => {
        console.log('Error on connection', err);
      });
  }
  render() {
    console.log(this.state);
    return (
      <div className="app">
        <MessageList messages={this.state.messages} startMessage={this.state.startMessage} />
        <RoomList
          joinedRooms={this.state.joinedRooms}
          joinableRooms={this.state.joinableRooms}
          subscribeToRoom={this.subscribeToRoom}
          currentRoomId={this.state.currentRoomId}
        />
        <NewRoomForm />
        <SendMessageForm sendMessage={this.sendMessageToChatkit} />
      </div>
    );
  }
}

export default Main;
