import React from 'react';
import OnlineIndicator from './OnlineIndicator';

const Contact = ({ presence, name, currentUser }) => {
  const you = currentUser.presenceStore[currentUser.id] === presence ? '(you)' : '';
  console.log(currentUser.id, currentUser.presenceStore[currentUser.id]);
  return (
    <li className="contact">
      <OnlineIndicator presence={presence} />
      {/* add avatar for roomUsers using https://ui-avatars.com/ API */}
      <img
        className="avatar"
        src={`https://ui-avatars.com/api/?name=${name}&size=30&rounded=true`}
        alt="avatar"
      />
      {`${name} ${you}`}
    </li>
  );
};

export default Contact;
