import React from "react";

const DisplayBestRoute = props => (
  <div className="best-route">
    {props.diff ? (
      <>
        <div>You should {props.moveType}.</div>
        <div>you'll save {props.diff}</div>
      </>
    ) : (
      <></>
    )}
  </div>
);

export default DisplayBestRoute;
