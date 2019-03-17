import { SET_ACTIVE_FILTERS, SET_CATEGORY } from "../../actions/types";
import React, { Component } from "react";
import { filetrsOfCategory } from "../../Helpers";
import { connect } from "react-redux";
import "./Dropdown.css";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      dropdownDisplay: false,
      min: null,
      max: null
    };
    this.createFilters = this.createFilters.bind(this);
    this.createSubtitle = this.createSubtitle.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      const { title, activeFilters } = this.props;

      // Create filters array in this.state (which indicates if chosen or not)
      if (title !== "Carat") {
        const filters = filetrsOfCategory(title).map(name => {
          if (title in activeFilters)
            if (activeFilters[title].filters.includes(name))
              return { name, chosen: true };
          return { name, chosen: false };
        });
        this.setState({ filters });
      }
    }
  }

  toggleDropdown() {
    this.setState({ dropdownDisplay: !this.state.dropdownDisplay });
  }

  // Creates divs of filters that are relevant to the category of the dropdown
  createFilters() {
    // In case the category is not 'Carat'
    if (this.props.title !== "Carat")
      return this.state.filters.map(filter => {
        const filterClass = filter.chosen ? "filter chosen" : "filter";
        return (
          <div
            className={filterClass}
            onClick={() => {
              this.state.filters.forEach((element, index) => {
                if (element.name === filter.name) {
                  let newFilters = [...this.state.filters];
                  newFilters[index] = {
                    name: filter.name,
                    chosen: !newFilters[index].chosen
                  };

                  this.setState({ filters: newFilters });
                  this.props.setActiveFilters(newFilters);
                }
              });
            }}
            key={filter.name}
          >
            {filter.name}
          </div>
        );
      });

    // In case the category is 'Carat'
    return [
      <input
        className="CaratInput"
        type="number"
        onChange={e => {
          this.setState({ min: e.target.value });
          this.props.setActiveFilters(e.target.value, this.state.max);
        }}
        placeholder="Min"
        key="min"
      />,
      <input
        className="CaratInput"
        type="number"
        onChange={e => {
          this.setState({ max: e.target.value });
          this.props.setActiveFilters(this.state.min, e.target.value);
        }}
        placeholder="Max"
        key="max"
      />
    ];
  }

  createSubtitle() {
    let subtitle =
      this.props.title in this.props.activeFilters &&
      this.props.title !== "Carat"
        ? this.props.activeFilters[this.props.title].filters.toString()
        : "";

    if (
      this.props.title in this.props.activeFilters &&
      this.props.title === "Carat"
    ) {
      let min = this.state.min === null ? "" : this.state.min;
      let max = this.state.max === null ? "" : this.state.max;

      subtitle =
        this.props.title in this.props.activeFilters &&
        this.props.title === "Carat"
          ? min + " - " + max
          : "";
    }

    return subtitle;
  }

  render() {
    const subtitle = this.createSubtitle();

    const filtesClass =
      this.state.dropdownDisplay && this.props.category === this.props.title
        ? "filters open"
        : "filters";

    return (
      <div className="dropdown">
        <div
          onClick={() => {
            this.props.setCategory(this.props.title);
            this.toggleDropdown();
          }}
          className="categoryBtn"
        >
          {this.props.title}
          <span className="subtitle">{subtitle}</span>
        </div>

        <div
          className={filtesClass}
          onMouseLeave={() => {
            this.toggleDropdown();
          }}
        >
          {this.createFilters()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ category, activeFilters }) => ({
  category,
  activeFilters
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  // Receives details and sets active filters in redux state
  setActiveFilters: (...args) => {
    if (ownProps.title === "Carat") {
      const min = args[0] === "" ? null : args[0];
      const max = args[1] === "" ? null : args[1];

      dispatch({
        type: SET_ACTIVE_FILTERS,
        payload: {
          obj: { [ownProps.title]: { min, max, type: "input" } },
          name: ownProps.title
        }
      });
    } else {
      const filters = args[0]
        .filter(filter => {
          return filter.chosen === true;
        })
        .map(filter => {
          return filter.name;
        });

      dispatch({
        type: SET_ACTIVE_FILTERS,
        payload: {
          obj: { [ownProps.title]: { filters, type: "dropdown" } },
          name: ownProps.title
        }
      });
    }
  },
  setCategory: category => dispatch({ type: SET_CATEGORY, payload: category })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dropdown);
