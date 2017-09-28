import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ children, onClick }) => (
  <button onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]),
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  children: null,
};

export default Button;
