import React, { useState, useEffect } from "react";
import "./App.css";
import CalcTravel from "./components/CalcTravel";
import AutoCompleteInput from "./components/DestinationForm";
import DisplayResults from "./components/DisplayResults";
import CalcBestRoute from "./components/CalcBestRoute";
import DisplayBestRoute from "./components/DisplayBestRoute";
import { Redirect, Route } from "react-router-dom";
import { GoogleApiWrapper } from "google-maps-react";

function App(props) {
  const [calcs, setCalcs] = useState({
    walkCalcs: {},
    driveCalcs: {},
    bestRoute: {
      best: "",
      diff: null
    },
    callWalk: false,
    callDrive: false,
    gotBest: false
  });
  const [location, setLocation] = useState("");
  const [state, setState] = useState({
    displayWalk: false,
    displayDrive: false,
    walkData: {
      origins: [],
      destinations: [],
      travelMode: "WALKING",
      unitSystem: props.google.maps.UnitSystem.IMPERIAL
    },
    driveData: {
      origins: [],
      destinations: [],
      travelMode: "DRIVING",
      unitSystem: props.google.maps.UnitSystem.IMPERIAL
    }
  });

  function resetWalk() {
    setState({
      ...state,
      getWalk: false,
      displayWalk: true
    });
  }

  function resetDrive() {
    setState({
      ...state,
      getDrive: false,
      displayDrive: true
    });
  }

  function setWalk(walkCalcs) {
    console.log("walk");
    setCalcs({
      ...calcs,
      walkCalcs: walkCalcs,
      callWalk: false
    });
  }

  function setDrive(driveCalcs) {
    console.log("Drive");
    setCalcs({
      ...calcs,
      driveCalcs: driveCalcs,
      callDrive: false
    });
  }

  function setOriginDestination(address) {
    if (location) {
      setState({
        ...state,
        displayWalk: false,
        displayDrive: false,
        walkData: {
          origins: [`${location}`],
          destinations: [`${address}`],
          travelMode: "WALKING",
          unitSystem: props.google.maps.UnitSystem.IMPERIAL
        },
        driveData: {
          origins: [`${location}`],
          destinations: [`${address}`],
          travelMode: "DRIVING",
          unitSystem: props.google.maps.UnitSystem.IMPERIAL
        }
      });
      setCalcs({
        ...calcs,
        callWalk: true,
        callDrive: true,
        gotBest: false
      });
    }
  }

  function setBestRoute(bestRoute) {
    bestRoute.diff = `${Math.floor(
      bestRoute.diff / 60
    )} hours ${bestRoute.diff % 60} minutes`;
    setCalcs({
      ...calcs,
      bestRoute: {
        best: bestRoute.best,
        diff: bestRoute.diff
      },
      gotBest: true
    });
  }

  function onRender() {
    if (location === "") {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation(
          `${position.coords.latitude}, ${position.coords.longitude}`
        );
      });
    }
  }

  useEffect(() => onRender(), [location]);

  useEffect(
    () => {
      if (calcs.driveCalcs && calcs.walkCalcs) {
        const bestRoute = CalcBestRoute(calcs.driveCalcs, calcs.walkCalcs);
        console.log(bestRoute);
        setBestRoute(bestRoute);
      }
    },
    [calcs.driveCalcs, calcs.walkCalcs]
  );

  useEffect(
    () => {
      if (calcs.callWalk === true) {
        CalcTravel(props.google.maps, state.walkData, setWalk, resetWalk);
      } else if (calcs.callDrive === true) {
        CalcTravel(props.google.maps, state.driveData, setDrive, resetDrive);
      }
    },
    [calcs.callWalk, calcs.callDrive]
  );

  return (
    <div className="App">
      <header>
        <h1 className="title">WALK or DRIVE</h1>
      </header>
      {location ? (
        <>
          <Route
            path="/"
            render={() => (
              <>
                <AutoCompleteInput
                  setOriginDestination={setOriginDestination}
                />
                <div className="empty" />
                {calcs.bestRoute.diff ? (
                  <Redirect from="/" to="/results" />
                ) : (
                  <></>
                )}
              </>
            )}
          />
          <Route
            path="/results"
            render={() => (
              <>
                <div className="all-results">
                  <div className="result-container">
                    <div className="walk">
                      <i className="fas fa-walking" />
                      <DisplayResults
                        result="walk-results"
                        moveType="walk"
                        state={calcs.walkCalcs}
                      />
                    </div>
                    <div className="drive">
                      <i className="fas fa-car" />
                      <DisplayResults
                        result="drive-results"
                        moveType="drive"
                        state={calcs.driveCalcs}
                      />
                    </div>
                  </div>
                  <div className="best-container">
                    <DisplayBestRoute
                      moveType={calcs.bestRoute.best}
                      diff={calcs.bestRoute.diff}
                    />
                  </div>
                </div>
              </>
            )}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(App);
