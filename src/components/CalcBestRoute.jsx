import React from 'react';
import DisplayBestRoute from './DisplayBestRoute'

const CalcBestRoute = (props) => {
  const driveDist = parseFloat(props.drive.distance);
  const driveDur = parseFloat(props.drive.duration);
  const walkDist = parseFloat(props.walk.distance);
  const walkDur = parseFloat(props.walk.duration);
  let best = '';
  let diff = null;

  if (driveDur >= walkDur) {
    console.log({driveDur});
    console.log({walkDur});
    console.log('hi');
    best = 'walk'
    console.log({best});
  } else {
    console.log({driveDur});
    console.log({walkDur});
    console.log('hi');
    best = 'drive'
    console.log({best});
  }
  if (driveDist >= walkDist) {
    diff = driveDist - walkDist
  } else {
    diff = walkDist - driveDist
  }
  return (
    <DisplayBestRoute
      moveType={best}
      diff={diff}/>
  )
}

export default CalcBestRoute
