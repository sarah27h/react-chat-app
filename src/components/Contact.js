import React from 'react';
import OnlineIndicator from './OnlineIndicator';

const Contact = ({ presence, name, avatar }) => {
  const you = presence === 'online' ? '(you)' : '';
  return (
    <li className="contact">
      <OnlineIndicator presence={presence} />
      <img className="avatar" src={`${avatar}`} alt="avatar" />
      {`${name} ${you}`}
    </li>
  );
};

export default Contact;
