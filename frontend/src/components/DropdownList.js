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
              key={item.name}
              value={item.value}
            >
              {item.name}
            </option>
          ))
          : null}
      </select>
    );
  }
}

DropdownList.propTypes = {
  fetchData: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

DropdownList.defaultProps = {
  fetchData: () => {},
};

export default DropdownList;
