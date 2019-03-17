import React from "react";
import { getTotalPriceAndDiamondCount } from "../../Helpers";
import "./DiamondsDetails.css";

const DiamondsDetails = () => {
  const info = getTotalPriceAndDiamondCount();
  return (
    <div className="diamondsDetails">
      <div className="numberOfDiamonds">
        <b>Number of diamonds: </b>
        {info.numberOfDiamonds}
      </div>
      <div className="totalPrice">
        <b>Total price: </b>
        <span style={{ color: "green" }}>${info.totalPrice}</span>
      </div>
    </div>
  );
};

export default DiamondsDetails;
