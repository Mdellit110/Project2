import React from 'react';

const DisplayBestRoute = (props) => (
<div className='DisplayBestRoute'>
  <p>it was be faster if you {props.moveType}</p>
  <p>you will most likely save {props.diff} off your trip</p>
</div>
)

export default DisplayBestRoute;
