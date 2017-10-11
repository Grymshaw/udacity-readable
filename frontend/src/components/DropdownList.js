/* eslint "react/jsx-filename-extension": 0 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class DropdownList extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  }

  render() {
    const { isRequired, list } = this.props;
    return (
      <select
        onChange={e => this.handleChange(e)}
        required={isRequired ? 'required' : ''}
        value={this.state.value}
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
  isRequired: PropTypes.bool,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
};

DropdownList.defaultProps = {
  isRequired: false,
  fetchData: () => {},
  onChange: () => {},
};

export default DropdownList;
