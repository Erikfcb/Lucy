import React, { Component } from "react";
import { categories } from "../../Helpers";
import Dropdown from "../Dropdown";
import "./Tabs.css";

class Tabs extends Component {
  createDropdowns() {
    let dropdowns = categories.map(category => {
      return <Dropdown title={category}  key={category}/>;
    });
    return dropdowns;
  }
  render() {
    return <div className="tabs">{this.createDropdowns()}</div>;
  }
}

export default Tabs;
