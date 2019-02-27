Walk or Cab

MVP: find how long it will take to travel somewhere based on traffic from current location to a given end point.

PostMVP:
- [X] Check for walk ETA and driving ETA
- [X] Compare the two ETAs to suggest faster option
- [ ] Use the actual map to set the destination and show routes

APIs:
-  Google Maps javascript API
-  Google Distance matrix service


Libraries:
-  google-maps-react
-  react-router-dom

Components:
- [ ] DestinationForm - allow user to input their destination
- [ ] CalcTravel - calculates time and distance from current location to set destination and returns data to state
- [ ] CalcBestRoute - compared data taken from calc travel and compares to find faster option
- [ ] DisplayResults - displays the time it will take to travel for both walk and drive
- [ ] DisplayBestRoute - displays a suggestion for the best method of transportation


Expected issues:
- [ ] Translating docs for apis from vanilla javascript to use in react
- [ ] Parsing returned data from api to just get what I need
- [ ] may run into a problem with keeping app running in the background when your device is off

Plans to overcome:
- [ ] Read docs thoroughly
- [ ] Find others online with similar problems and reverse engineer their code to see how each thing does what in react compared to vanilla
- [ ] Get help from my good friends and even better instructors Drake Brian and Jason
