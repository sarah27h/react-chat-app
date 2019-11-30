import React, { Component } from 'react';
import Message from './Message';
import { withChatkit } from '@pusher/chatkit-client-react';

const MESSAGES_DUMMY_DATA = [
  {
    senderId: 'perborgen',
    text: 'Hey, how is it going?'
  },
  {
    senderId: 'janedoe',
    text: 'Great! How about you?'
  },
  {
    senderId: 'perborgen',
    text: 'Good to hear! I am great as well'
  }
];

class MessageList extends Component {
  render() {
    const messages = MESSAGES_DUMMY_DATA.map((message, index) => {
      return <Message senderId={message.senderId} text={message.text} key={index} />;
    });
    return (
      <div className="message-list">
        {messages}
        <div>
          {this.props.chatkit.isLoading
            ? 'Connecting to Chatkit...'
            : `Hello ${this.props.chatkit.currentUser.name}!`}
        </div>
      </div>
    );
  }
}

export default withChatkit(MessageList);
