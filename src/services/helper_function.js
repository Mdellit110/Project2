
const doMaths = (driveDur, walkDur) => {
  let walkTotalMins = '';
  let driveTotalMins = '';
  if (walkDur && driveDur) {
    const walkArr = walkDur.split(' ');
    const driveArr = driveDur.split(' ');

    if (walkArr[1] === 'mins') {
      let walkMins = parseInt(walkArr[0]);
      walkTotalMins = walkMins;
    } else if (walkArr[1] === 'hour' || walkArr[1] === 'hours') {
      let walkHours = parseInt(walkArr[0]);
      let walkMins = parseInt(walkArr[2]);
      walkTotalMins = (walkHours * 60) + walkMins;
    }

    if (driveArr[1] === 'mins') {
      let driveMins = parseInt(driveArr[0]);
      driveTotalMins = driveMins;
    } else if (driveArr[1] === 'hour' || driveArr[1] === 'hours') {
      let driveHours = parseInt(driveArr[0]);
      let driveMins = parseInt(driveArr[2]);
      driveTotalMins = (driveHours * 60) + driveMins;
    }
  }
  return {
    walk: walkTotalMins,
    drive: driveTotalMins
  }
}

export default doMaths
