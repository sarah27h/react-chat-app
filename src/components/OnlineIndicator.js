import React from 'react';

const OnlineIndicator = ({ presence }) => {
  const userPresence = presence === 'online' ? 'online' : 'offline';
  return <div className={`indicator ${userPresence}`} />;
};

export default OnlineIndicator;
