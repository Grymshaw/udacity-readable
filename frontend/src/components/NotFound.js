/* eslint "react/jsx-filename-extension": 0 */
import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css';

const NotFound = ({ history }) => (
  <div className="not-found-wrapper">
    <p className="not-found-text">
      We're sorry! The resource you're looking for couldn't be located. Please go <span
        role="link"
        tabIndex={0}
        className="not-found-link"
        onClick={history.goBack}
      >back</span> or head to the <Link className="not-found-link" to="/">Readable homepage</Link>.
    </p>
  </div>
);

export default NotFound;
