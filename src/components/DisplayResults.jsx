import React from "react";

const DisplayResults = props => {
  return (
    <div className={props.result}>
      <div>
        <h2>{props.moveType.toUpperCase()} TIME</h2>
      </div>
      <p className="">{props.state.duration}</p>
    </div>
  );
};

export default DisplayResults;
