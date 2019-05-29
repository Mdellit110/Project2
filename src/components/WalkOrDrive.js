import React, { useState, useEffect } from "react";
import CalcTravel from "./CalcTravel";
import AutoCompleteInput from "./DestinationForm";
import DisplayResults from "./DisplayResults";
import CalcBestRoute from "./CalcBestRoute";
import DisplayBestRoute from "./DisplayBestRoute";
import Map from "./Map";
import { GoogleApiWrapper } from "google-maps-react";
function WalkOrDrive(props) {
  const {
    location,
    showMap,
    setShowMap,
    travelType,
    setTravelType,
    setHasResults,
    hasResults
  } = props;

  const [calcs, setCalcs] = useState({
    walkCalcs: {},
    driveCalcs: {}
  });
  const [rendered, setRender] = useState(false);
  const [bestRoute, setBestRoute] = useState({
    best: "",
    diff: null
  });
  const [destinations, setDestinations] = useState({
    drive: {
      origins: [],
      destinations: [],
      travelMode: "DRIVING",
      unitSystem: props.google.maps.UnitSystem.IMPERIAL
    },
    walk: {
      origins: [],
      destinations: [],
      travelMode: "WALKING",
      unitSystem: props.google.maps.UnitSystem.IMPERIAL
    }
  });

  function startSearch(address) {
    setDestinations({
      drive: {
        origins: [`${location}`],
        destinations: [`${address}`],
        travelMode: "DRIVING",
        unitSystem: props.google.maps.UnitSystem.IMPERIAL
      },
      walk: {
        origins: [`${location}`],
        destinations: [`${address}`],
        travelMode: "WALKING",
        unitSystem: props.google.maps.UnitSystem.IMPERIAL
      }
    });
  }
  function setBest(best) {
    bestRoute.diff = `${Math.floor(
      bestRoute.diff / 60
    )} hours ${bestRoute.diff % 60} minutes`;
    setBestRoute({
      best: best.best,
      diff: best.diff
    });
    setHasResults(true);
    setTravelType("Compare");
  }
  async function doCalculations() {
    const { walking, driving } = await CalcTravel(
      props.google.maps,
      destinations
    );
    setCalcs({ walkCalcs: walking, driveCalcs: driving });
    setBest(CalcBestRoute(driving, walking));
  }

  useEffect(
    () => {
      if (rendered) doCalculations();
      setRender(true);
    },
    [destinations]
  );

  return (
    <div>
      <div className="searchbar">
        <button onClick={() => setShowMap(!showMap)}>Map</button>
        <AutoCompleteInput
          setShowMap={setShowMap}
          setOriginDestination={startSearch}
        />
      </div>
      {hasResults ? (
        <div className="all-results">
          <div className="result-container">
            {travelType === "Walk" ? (
              <div className="result">
                <i className="fas fa-walking" />
                <DisplayResults
                  result="walk-results"
                  moveType="walk"
                  state={calcs.walkCalcs}
                />
              </div>
            ) : null}
            {travelType === "Drive" ? (
              <div className="result">
                <i className="fas fa-car" />
                <DisplayResults
                  result="drive-results"
                  moveType="drive"
                  state={calcs.driveCalcs}
                />
              </div>
            ) : null}
            {travelType === "Compare" ? (
              <div className="result">
                <i
                  className={
                    bestRoute.best === "drive" ? "fas fa-car" : "fas fa-walking"
                  }
                />
                <DisplayBestRoute
                  moveType={bestRoute.best}
                  diff={bestRoute.diff}
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="best-route">
          <div>Search above and click the arrow for results!</div>
          <div>Toggle map with the map button</div>
        </div>
      )}
      <Map showMap={showMap} location={location} />
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(WalkOrDrive);
