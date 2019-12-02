import React, { Component } from 'react';
import MessageList from './MessageList';
import RoomList from './RoomList';
import NewRoomForm from './NewRoomForm';
import SendMessageForm from './SendMessageForm';
import { tokenUrl, chatkitInstanceLocator } from '../config/config';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

class Main extends Component {
  state = {
    messages: []
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
        console.log('Successful connection', currentUser);
        currentUser.subscribeToRoomMultipart({
          roomId: 'b612162c-ade2-4c7c-9e23-41a249c88912',
          hooks: {
            onMessage: message => {
              console.log('received message', message, message.parts[0].payload.content);
              this.setState({ messages: [...this.state.messages, message] });
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
        <MessageList messages={this.state.messages} />
        <RoomList />
        <NewRoomForm />
        <SendMessageForm sendMessage={this.sendMessageToChatkit} />
      </div>
    );
  }
}

export default Main;
