import React, { useState, useEffect } from "react";
import "./App.css";
import WalkOrDrive from "./components/WalkOrDrive";
import Home from "./components/Home";
import Tabs from "./components/Tabs";
function App(props) {
  const [mode, setMode] = useState("Home");
  const [showMap, setShowMap] = useState(false);
  const [travelType, setTravelType] = useState(null);
  const [location, setLocation] = useState("");
  const [rendered, setRendered] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  function findPerson() {
    if (!location) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation(
          `${position.coords.latitude}, ${position.coords.longitude}`
        );
      });
      setRendered(true);
    }
  }
  useEffect(() => findPerson(), [location]);
  useEffect(
    () => {
      if (mode === "Home") setHasResults(false);
    },
    [mode]
  );
  return (
    <div className="App">
      <div className={`nav ${mode}`}>
        <h1 className={`title ${mode}`}>WALK or DRIVE</h1>
      </div>

      {mode !== "Home" ? (
        <WalkOrDrive
          location={location}
          showMap={showMap}
          setShowMap={setShowMap}
          travelType={travelType}
          setTravelType={setTravelType}
          hasResults={hasResults}
          setHasResults={setHasResults}
        />
      ) : (
        <Home action={setMode} />
      )}
    </div>
  );
}

export default App;
