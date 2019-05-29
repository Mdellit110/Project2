import React from "react";

const DisplayBestRoute = props => (
  <div className="best-route">
    <div>You should {props.moveType}.</div>
    <div>you'll save {props.diff}</div>
  </div>
);

export default DisplayBestRoute;
