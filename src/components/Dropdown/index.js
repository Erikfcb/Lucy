import React, { Component } from "react";
import { data } from "../../data";
import { connect } from "react-redux";
import * as actions from "../../actions";
import "./Dropdown.css";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdown: false
    };
    this.createFilters = this.createFilters.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState({ dropdown: !this.state.dropdown });
  }

  createFilters() {
    return this.props.category.filters.map(filter => {
      return <div className="filter">{filter.name}</div>;
    });
  }

  render() {
    const filters = this.createFilters();
    const dropdownClass =
      this.props.category.opened &&
      this.props.category.name === this.props.categoryName
        ? "filters"
        : "filters close";
    console.log(filters);

    return (
      <div className="dropdown">
        <div onClick={this.props.onClickFunction} className="categoryBtn">
          {this.props.title}
        </div>
        <div className={dropdownClass}>{filters}</div>
      </div>
    );
  }
}

function mapStateToProps({ category }) {
  return {
    category
  };
}

export default connect(
  mapStateToProps,
  actions
)(Dropdown);
