import React, { Component } from "react";
import Tabs from "../Tabs";
import Table from "../Table";
import { data } from "../../data";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Tabs />
        <Table />
      </div>
    );
  }
}

export default Home;
