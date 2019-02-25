Walk or Cab

MVP: find how long it will take to travel somewhere based on traffic giving a start point and end point.

PostMVP:
- [ ] Set start point based on current location using geolocation api
- [ ] Check for walk ETA and driving ETA
- [ ] Compare the two ETAs to suggest faster option
- [ ] Store data saved from average walking speed per person to more accurately suggest option
- [ ] Use the actual map to set the destination and show routes

APIs:
- [ ] Google Maps javascript API
- [ ] Google Distance matrix API
- [ ] Google Geocoding API
- [ ] Google Geolocation API

Libraries:
- [ ] Google-maps-react
- [ ] Google-distance-matrix

Components:
- [ ] RenderMap- renders a basic map on screen
- [ ] DestinationForm- allow user to input their destination and current location manually
- [ ] CalcDifference - calculate if walking time is faster then driving and return some comparative stats
- [ ] CalcWalking- calculates time to walk
- [ ] CalcDriving- calculates time to drive
- [ ] DisplayOptions- will render the page showing data received from CalcDifference


Expected issues:
- [ ] Translating docs for apis from vanilla javascript to use in react
- [ ] Parsing returned data from api to just get what I need
- [ ] may run into a problem with keeping app running in the background when your device is off

Plans to overcome:
- [ ] Read docs thoroughly
- [ ] Find others online with similar problems and reverse engineer their code to see how each thing does what in react compared to vanilla
- [ ] Get help from my good friends and even better instructors Drake Brian and Jason
