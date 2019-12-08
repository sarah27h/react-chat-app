import React, { Component, Fragment } from 'react';
import Message from './Message';

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
  // create ref for <MessageList /> to use for auto scroll
  constructor(props) {
    super(props);
    this.messageListRef = React.createRef();
  }

  componentDidUpdate() {
    // outoscroll to last message
    const messageListNode = this.messageListRef.current;
    messageListNode.scrollTop = messageListNode.scrollHeight;
  }

  render() {
    const { messages, startMessage } = this.props;

    const roomMessages = messages.map((message, index) => {
      return <Message senderId={message.senderId} text={message} key={message.id} />;
    });

    return (
      <Fragment>
        <div className="message-list" ref={this.messageListRef}>
          {roomMessages}
          <div className="start-message">{startMessage}</div>
        </div>
      </Fragment>
    );
  }
}

export default MessageList;
