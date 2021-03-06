import React, { Component } from 'react';
import MessageList from './MessageList';
import RoomList from './RoomList';
import NewRoomForm from './NewRoomForm';
import SendMessageForm from './SendMessageForm';
import { tokenUrl, chatkitInstanceLocator } from '../config/config';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import ContactList from './ContactList';
import RoomHeader from './RoomHeader.js';

class Main extends Component {
  state = {
    messages: [],
    joinableRooms: [],
    joinedRooms: [],
    currentRoomId: null,
    roomUsers: [],
    currentRoomName: null,
    messageFullArea: false
  };

  // <MessagesList /> take full width
  handleHamburgerClick = () => {
    this.setState(prevState => {
      return { messageFullArea: !prevState.messageFullArea };
    });
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

    this.currentUser
      .isTypingIn({ roomId: this.state.currentRoomId })
      .then(() => {
        console.log('Success!', this.currentUser.name);
      })
      .catch(err => {
        console.log(`Error sending typing indicator: ${err}`);
      });
  };

  subscribeToRoom = (roomId, roomName) => {
    // console.log(roomId);
    this.setState({ currentRoomId: roomId, messages: [], currentRoomName: roomName }); // UX clean screen every time user click an new room
    this.currentUser
      .subscribeToRoomMultipart({
        roomId: roomId,
        hooks: {
          onMessage: message => {
            this.setState({ messages: [...this.state.messages, message] });
            console.log(message);
          },
          // fires whenever a member of that room goes on or off line
          onPresenceChanged: (state, user) => {
            console.log(`User ${user} ${user.id} is ${state.current}`);
          },
          onUserStartedTyping: user => {
            console.log(`User ${user.name} started typing`);
          },
          onUserStoppedTyping: user => {
            console.log(`User ${user.name} stopped typing`);
          }
        },
        messageLimit: 20
      })
      .then(room => {
        this.setState({
          currentRoomId: room.id,
          roomUsers: room.users
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

  creatRoom = roomName => {
    this.currentUser
      .createRoom({
        name: roomName
      })
      .then(room => {
        this.subscribeToRoom(room.id);
        console.log(`Created room called ${room.name}`);
      })
      .catch(err => {
        console.log(`Error creating room ${err}`);
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

        console.log('Successful connection', currentUser.rooms);
      })
      .catch(err => {
        console.log('Error on connection', err);
      });
  }
  render() {
    // console.log(this.state);
    return (
      <div className="app">
        <RoomHeader
          currentRoomName={this.state.currentRoomName}
          currentRoomId={this.state.currentRoomId}
          handleHamburgerClick={this.handleHamburgerClick}
          messageFullArea={this.state.messageFullArea}
        />

        <MessageList
          messages={this.state.messages}
          startMessage={this.state.startMessage}
          currentRoomId={this.state.currentRoomId}
          messageFullArea={this.state.messageFullArea}
        />

        <RoomList
          joinedRooms={this.state.joinedRooms}
          joinableRooms={this.state.joinableRooms}
          subscribeToRoom={this.subscribeToRoom}
          currentRoomId={this.state.currentRoomId}
        />

        <ContactList roomUsers={this.state.roomUsers} currentUser={this.currentUser} />

        <NewRoomForm creatRoom={this.creatRoom} />

        <SendMessageForm
          sendMessage={this.sendMessageToChatkit}
          currentRoomId={!this.state.currentRoomId}
          messageFullArea={this.state.messageFullArea}
        />
      </div>
    );
  }
}

export default Main;
