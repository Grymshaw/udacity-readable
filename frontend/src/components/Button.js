import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ children, className, onClick }) => (
  <button onClick={onClick} className={className}>
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
