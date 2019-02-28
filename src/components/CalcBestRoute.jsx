
import doMaths from '../services/helper_function'

let best = '';
let diff = null;

const CalcBestRoute = (props) => {
      const driveDur = props.drive.duration;
      const walkDur = props.walk.duration;
      const {walk, drive} = doMaths(driveDur, walkDur)
      if (drive >= walk) {
        diff = drive - walk
        best = 'walk'
      } else {
        diff = walk - drive
        best = 'drive'
      }
      const bestRoute = {
        diff: diff,
        best: best
      }
      props.set(bestRoute)
}

export default CalcBestRoute
