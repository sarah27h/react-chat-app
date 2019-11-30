import React, { Component } from 'react';
import MessageList from './MessageList';
import RoomList from './RoomList';
import NewRoomForm from './NewRoomForm';
import SendMessageForm from './SendMessageForm';
import { ChatkitProvider, TokenProvider, withChatkit } from '@pusher/chatkit-client-react';
import { tokenUrl, chatkitInstanceLocator } from '../config/config';

class Main extends Component {
  render() {
    const instanceLocator = chatkitInstanceLocator;

    const tokenProvider = new TokenProvider({
      url: tokenUrl
    });

    const userId = 'salma';

    return (
      <div className="app">
        <ChatkitProvider
          instanceLocator={instanceLocator}
          tokenProvider={tokenProvider}
          userId={userId}
        >
          {/* <WelcomeMessage /> */}
          <MessageList />
        </ChatkitProvider>
        <RoomList />
        <NewRoomForm />
        <SendMessageForm />
      </div>
    );
  }
}

export default Main;
