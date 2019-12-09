import React, { Component } from 'react';
import Message from './Message';

class MessageList extends Component {
  // create ref for <MessageList /> to use for auto scroll
  constructor(props) {
    super(props);
    this.messageListRef = React.createRef();
  }

  // check where user in the scroll
  // use getSnapshotBeforeUpdate() instead of using componentWillUpdate
  getSnapshotBeforeUpdate(prevProps, prevState) {
    const messageListNode = this.messageListRef.current;
    // scrollTop height of scrolled part from top
    // clientHeight height of appeared part
    // scrollHeight height of <MessageList />
    // scroll to bottom when we are near it
    this.shouldScrollToBottom =
      messageListNode.scrollTop + messageListNode.clientHeight + 100 >=
      messageListNode.scrollHeight;
    return this.shouldScrollToBottom;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // outoscroll to last message
    // snapshot is the value returned from getSnapshotBeforeUpdate
    if (snapshot) {
      const messageListNode = this.messageListRef.current;
      messageListNode.scrollTop = messageListNode.scrollHeight;
    }
  }

  render() {
    const { messages, startMessage, currentRoomId } = this.props;

    const roomMessages = messages.map((message, index) => {
      return <Message senderId={message.senderId} text={message} key={message.id} />;
    });

    if (!currentRoomId) {
      return (
        <div className="message-list" ref={this.messageListRef}>
          <div className="start-message">Click a room to start chatting</div>
        </div>
      );
    }

    return (
      <div className="message-list" ref={this.messageListRef}>
        {roomMessages}
      </div>
    );
  }
}

export default MessageList;
