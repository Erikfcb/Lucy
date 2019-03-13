import React, { Component } from "react";
import { SET_DIAMONDS, SET_CATEGORY } from "../../actions/types";
import { data, categories } from "../../data";
import { connect } from "react-redux";
import Dropdown from "../Dropdown";
import "./Tabs.css";

class Tabs extends Component {
  createDropdowns() {
    let dropdowns = [];
    for (let key in categories) {
      dropdowns.push(
        <Dropdown
          title={key}
          subtitle={""}
          categoryName={key}
          onClickFunction={() => {
            const category = {
              name: key,
              filters: categories[key],
              opened: !this.props.category.opened
            };
            console.log(category);

            this.props.setCategory(category);
          }}
        />
      );
    }
    return dropdowns;
  }
  render() {
    console.log(categories);
    const dropdowns = this.createDropdowns();

    return <div className="tabs">{dropdowns}</div>;
  }
}

function mapStateToProps({ category }) {
  return { category };
}

function mapDispatchToProps(dispatch) {
  return {
    setDiamonds: diamonds =>
      dispatch({ type: SET_DIAMONDS, payload: diamonds }),
    setCategory: category => dispatch({ type: SET_CATEGORY, payload: category })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tabs);
