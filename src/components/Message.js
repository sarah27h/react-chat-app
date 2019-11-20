import React, { Component } from 'react';

class Message extends Component {
  render() {
    const { senderId, text } = this.props;
    return (
      <div className="message">
        <div className="message-username">{senderId}</div>
        <div className="message-text">{text}</div>
      </div>
    );
  }
}

export default Message;
