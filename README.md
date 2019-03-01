Walk or Drive

Description:
  the app i created for project2 is a relatively simple app used to determine if a nearby location would be more convenient to walk or drive there. most often the answer is to drive but when your in the big city the right answer can change all the time based on traffic or even just dealing with the one way road system.

MVP: find how long it will take to travel somewhere based on traffic from current location to a given end point.

PostMVP:
- [X] Check for walk ETA and driving ETA
- [X] Compare the two ETAs to suggest faster option

APIs:
-  Google Maps javascript API
-  Google Distance matrix service
-  Google places service

Libraries:
-  google-maps-react
-  react-router-dom
-  react-places-autocomplete

Components:
-  DestinationForm - allow user to input their destination
-  CalcTravel - calculates time and distance from current location to set destination and returns data to state
-  CalcBestRoute - compared data taken from calc travel and compares to find faster option
-  DisplayResults - displays the time it will take to travel for both walk and drive
-  DisplayBestRoute - displays a suggestion for the best method of transportation

Helper Function:
-  DoMaths - takes string of time i.e('2 hours 20 mins') splits into an array then determines what unit of time it is and converts to minutes then passes it into CalcBestRoute

Code Snippet:
the doMaths helper Function
```javascript
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
```

Issues and Resolutions:
- Warning: setState(...): Cannot update during an existing state transition (such as within `render`).

this error was a big problem for me because its when i realized i was basically using state the wrong way the whole time because i was changing state inside of the render which triggered a new render which then triggered a new state change so basically an infinite loop. i realized that that was not good react code so i restructured most of my components from class components and had to move them around and change what triggered their calls and eventually it all worked out.
