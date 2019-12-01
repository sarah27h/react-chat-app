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
    const { messages } = this.props;
    const roomMessages = messages.map((message, index) => {
      return <Message senderId={message.senderId} text={message} key={index} />;
    });
    return <div className="message-list">{roomMessages}</div>;
  }
}

export default MessageList;
