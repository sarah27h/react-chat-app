import React, { Component } from 'react';

class SendMessageForm extends Component {
  state = {
    message: ''
  };

  handleChange = e => {
    this.setState({ message: e.target.value });
  };

  handleSubmit = e => {
    const { sendMessage } = this.props;
    e.preventDefault();
    // send message up as an action to <Main />
    sendMessage(this.state.message);
    this.setState({ message: '' }); // to improve UX
  };

  render() {
    return (
      <div className="send-message-form">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.message}
            onChange={this.handleChange}
            placeholder="Type message and hit enter"
          />
        </form>
      </div>
    );
  }
}

export default SendMessageForm;
