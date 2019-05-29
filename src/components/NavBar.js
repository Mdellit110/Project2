import React from "react";

export default function NavBar({
  mode,
  setMode,
  setTravelType,
  hasResults,
  setHasResults
}) {
  function setBoth() {
    setMode("Home");
    setTravelType(null);
    setHasResults(false);
  }
  return (
    <div className="button-group ">
      {mode !== "Home" ? (
        <>
          <button
            disabled={!hasResults}
            onClick={() => setTravelType("Walk")}
            className="tab walk-tab"
          >
            Walk
          </button>
          <button
            disabled={!hasResults}
            onClick={() => setTravelType("Both")}
            className="tab walk-tab"
          >
            Compare
          </button>
          <button
            disabled={!hasResults}
            onClick={() => setTravelType("Drive")}
            className="tab drive-tab"
          >
            Drive
          </button>
          <button onClick={() => setBoth()} className="tab drive-tab">
            Home
          </button>
        </>
      ) : (
        <button
          onClick={() => setMode("Calculate")}
          className="tab compare-tab"
        >
          Calculate
        </button>
      )}
    </div>
  );
}
