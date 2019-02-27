import React from 'react';
import DisplayBestRoute from './DisplayBestRoute'
import doMaths from '../services/helper_function'
const CalcBestRoute = (props) => {
  let best = '';
  let diff = null;
  console.log(props.drive.duration);
  if ( !Number.isNaN(parseInt(props.drive.duration)) && props.drive.duration !== undefined) {
    const driveDur = props.drive.duration;
    const walkDur = props.walk.duration;
    const {walk, drive} = doMaths(driveDur, walkDur)

    console.log('hi');

    if (drive >= walk) {
      diff = drive - walk
      best = 'walk'
    } else {
      diff = walk - drive
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
