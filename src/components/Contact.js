import React from 'react';
import OnlineIndicator from './OnlineIndicator';

const Contact = ({ presence, name }) => {
  const you = presence === 'online' ? '(you)' : '';
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
