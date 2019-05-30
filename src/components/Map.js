import React, { useEffect } from "react";
import useMap from "./useMap";

export default function Map({
  maps,
  location,
  destinations,
  travelType,
  children
}) {
  const { googleMaps, map, mapRef, loading } = useMap({
    maps,
    destinations,
    location,
    travelType
  });

  return (
    <div className="map-container">
      <div ref={mapRef} className="map-ref" />
      {!loading &&
        React.Children.map(children, child => {
          return React.cloneElement(child, { map, googleMaps });
        })}
    </div>
  );
}
