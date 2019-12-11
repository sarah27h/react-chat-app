import React, { Component } from 'react';
import Contact from './Contact';

class ContactList extends Component {
  state = {
    avatars: []
  };

  fetchAvaters = async userName => {
    try {
      // add await before make a call
      const api_call = await fetch(`https://ui-avatars.com/api/?name=${userName}`);

      // handle response using json() method to turn response into JSON
      const response = await api_call.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { roomUsers } = this.props;
    const contactsList = roomUsers.map(contact => {
      return (
        <Contact
          name={contact.name}
          key={contact.id}
          avatar={contact.avatarURL}
          presence={contact.presenceStore[`${contact.id}`]}
        />
      );
    });
    return (
      <div className="contacts-list">
        <h3>Your Contacts</h3>
        <ul>{contactsList}</ul>;
      </div>
    );
  }
}

export default ContactList;
