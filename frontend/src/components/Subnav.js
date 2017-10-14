import PropTypes from 'prop-types';
import React from 'react';

const Subnav = ({ children }) => {
  const style = {
    width: '100%',
    minHeight: '30px',
    backgroundColor: '#FB3126',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '2px solid black',
  };
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  };
  return (
    <div style={style}>
      <div className="container" style={containerStyle}>
        {children}
      </div>
    </div>
  );
};

Subnav.propTypes = {
  children: PropTypes.node,
};

Subnav.defaultProps = {
  children: null,
};

export default Subnav;
