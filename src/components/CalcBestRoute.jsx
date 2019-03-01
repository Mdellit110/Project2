
import doMaths from '../services/helper_function'

let best = '';
let diff = null;

const CalcBestRoute = (driveData, walkData, set) => {
      const driveDur = driveData.duration;
      const walkDur = walkData.duration;
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
      set(bestRoute)
      return null
}

export default CalcBestRoute
