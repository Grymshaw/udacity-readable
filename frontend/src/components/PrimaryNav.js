import React from 'react';

const PrimaryNav = ({ children }) => {
  const style = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    minHeight: '50px',
    backgroundColor: '#15B5B4',
    borderBottom: '3px solid lightgrey',
  };
  return (
    <div style={style}>
      <div className="container">
        {children}
      </div>
    </div>
  );
};

export default PrimaryNav;
