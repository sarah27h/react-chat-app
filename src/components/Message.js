import React from 'react';

const Message = ({ senderId, text }) => {
  return (
    <div className="message">
      <div className="message-username">{senderId}</div>
      <div className="message-text">{text.parts[0].payload.content}</div>
    </div>
  );
};

export default Message;
