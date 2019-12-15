import React, { Component } from 'react';
import Contact from './Contact';

class ContactList extends Component {
  render() {
    const { roomUsers, currentUser } = this.props;
    const contactsList = roomUsers.map(contact => {
      return (
        <Contact
          name={contact.name}
          key={contact.id}
          presence={contact.presenceStore[`${contact.id}`]}
          currentUser={currentUser}
        />
      );
    });
    return (
      <div className="contacts-list">
        <h2>Your Contacts</h2>
        <ul>{contactsList}</ul>
      </div>
    );
  }
}

export default ContactList;
