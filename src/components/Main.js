import React, { Component } from 'react';
import MessageList from './MessageList';
import RoomList from './RoomList';
import NewRoomForm from './NewRoomForm';
import SendMessageForm from './SendMessageForm';
import { tokenUrl, chatkitInstanceLocator } from '../config/config';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

class Main extends Component {
  // hook our app with chatkit API
  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: chatkitInstanceLocator,
      userId: 'salma',
      tokenProvider: new TokenProvider({ url: tokenUrl })
    });

    // connect with chatkit
    chatManager
      .connect()
      .then(currentUser => {
        console.log('Successful connection', currentUser);
        currentUser.subscribeToRoomMultipart({
          roomId: 'b612162c-ade2-4c7c-9e23-41a249c88912',
          hooks: {
            onMessage: message => {
              console.log('received message', message);
            }
          },
          messageLimit: 10
        });
      })
      .catch(err => {
        console.log('Error on connection', err);
      });
  }
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
