import React, { Component } from 'react';

class SendMessageForm extends Component {
  render() {
    return (
      <div className="send-message-form">
        <form>
          <input type="text" placeholder="Type message and hit enter" />
        </form>
      </div>
    );
  }
}

export default SendMessageForm;
