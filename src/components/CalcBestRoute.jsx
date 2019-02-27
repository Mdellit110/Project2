import React from 'react';
import DisplayBestRoute from './DisplayBestRoute'

const CalcBestRoute = (props) => {
  let best = '';
  let diff = null;
  if (props.drive.duration) {
    const driveDur = parseInt(props.drive.duration);
    const walkDur = parseInt(props.walk.duration);
    console.log(walkDur);
    if (driveDur >= walkDur) {
      diff = driveDur - walkDur
      best = 'walk'
    } else {
      diff = walkDur - driveDur
      best = 'drive'
    }
  }
  return (
    <>
    <DisplayBestRoute
      moveType={best}
      diff={diff}/>
    </>
  )
}

export default CalcBestRoute
