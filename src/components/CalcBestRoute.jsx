import doMaths from "../services/helper_function";

let best = "";
let diff = null;

const CalcBestRoute = (driveData, walkData) => {
  const driveDur = driveData.duration;
  const walkDur = walkData.duration;
  const { walk, drive } = doMaths(driveDur, walkDur);
  if (drive >= walk) {
    diff = drive - walk;
    best = "walk";
  } else {
    diff = walk - drive;
    best = "drive";
  }
  diff =
    diff > 60
      ? `${Math.floor(diff / 60)} hours ${diff % 60} minutes`
      : `${diff} minutes`;
  const bestRoute = {
    diff: diff,
    best: best
  };
  return bestRoute;
};

export default CalcBestRoute;
