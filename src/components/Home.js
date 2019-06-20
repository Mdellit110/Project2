import React from "react";

export default function Home({ action }) {
  return (
    <div className="home-container">
      <div className="home-float">
        <h2>Welcome to Walk or Drive!</h2>
        <p>
          click on the calculate button above to go to the distance calculator
        </p>
        <button className="calc-button" onClick={() => action("Calculate")}>
          Calculate
        </button>
        <h3>How is this even useful?</h3>
        <p>
          at first it does seem silly to check which way is faster but you'd be
          suprised how often your wrong. In places like New York City things
          like traffic, one-way roads, road closure, detours all effect the
          travel time of cars but not necessarily walkers. If you only need to
          travel 5 blocks that could be 5 minutes or an hour in a car, but
          thanks to this app you can quickly check the fastest mode of
          transportation.
        </p>
      </div>
    </div>
  );
}
