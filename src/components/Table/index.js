import React, { Component } from "react";
import { data } from "../../data";
import Dropdown from "../Dropdown";
import { connect } from "react-redux";
import "./Table.css";

class Table extends Component {
  createTable() {
    let headers = [];

    for (let key in this.props.diamonds[0]) {
      if (key !== "CertificateLink") headers.push(<th>{key}</th>);
    }

    let details = this.props.diamonds.map((diamond, index) => {
      const details = [];
      for (let key in diamond) {
        if (key !== "CertificateLink") details.push(<td>{diamond[key]}</td>);
      }

      return <tr>{details}</tr>;
    });

    return [...headers, ...details];
  }

  render() {
    const diamonds = this.createTable(); 
    return <table className="table">{diamonds}</table>;
  }
}

function mapStateToProps({ diamonds }) {
  return { diamonds };
}

export default connect(mapStateToProps)(Table);
