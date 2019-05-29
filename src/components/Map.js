import React from "react";
import { Map as GoogleMap, Marker } from "google-maps-react";

export default function Map({ showMap, location }) {
  const split = location.split(", ");
  const currentLocation = { lat: split[0], lng: split[1] };
  const style = {
    position: "relative",
    height: "73%",
    width: "98%"
  };
  return (
    <div className="map-container">
      <GoogleMap
        google={window.google}
        className="map"
        visible={showMap}
        style={style}
        initialCenter={currentLocation}
      >
        <Marker position={currentLocation} />
      </GoogleMap>
    </div>
  );
}
