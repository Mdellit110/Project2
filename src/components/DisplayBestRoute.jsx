import React from 'react';

const DisplayBestRoute = (props) => (
<div className='best-route'>
  <div>you should {props.moveType}</div>
  <div>you'll save {props.diff}</div>
  <div>minutes</div>
</div>
)

export default DisplayBestRoute;
