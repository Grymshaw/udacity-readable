/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class DropdownList extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { list, onChange } = this.props;
    return (
      <select
        onChange={e => onChange(e.target.value)}
      >
        {list && list.length
          ? list.map(item => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))
          : null}
      </select>
    );
  }
}

DropdownList.propTypes = {
  fetchData: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DropdownList;
