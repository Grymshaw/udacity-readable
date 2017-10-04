/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class DropdownList extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  handleChange() {
    const { list } = this.props;
    if (this.select) {
      this.value = this.select.value;
    } else {
      this.value = list.length ? list[0] : null;
    }
  }

  render() {
    const { isRequired, list, onChange } = this.props;
    return (
      <select
        onChange={(e) => {
          onChange(e.target.value);
          this.handleChange();
        }}
        required={isRequired ? "required" : ""}
        defaultValue={''}
        ref={(input) => { this.select = input; }}
      >
        {/* default option */}
        <option disabled value="">Select an option</option>
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
  isRequired: PropTypes.boolean,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
};

DropdownList.defaultProps = {
  isRequired: false,
  fetchData: () => {},
  onChange: () => {},
};

export default DropdownList;
