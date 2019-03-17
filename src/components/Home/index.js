import React, { Component } from "react";
import Tabs from "../Tabs";
import Table from "../Table";
import DiamondsDetails from "../DiamondsDetails";
import Popup from "../Popup";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <DiamondsDetails />
        <Tabs />
        <Table />
        <Popup />
      </div>
    );
  }
}

export default Home;
