import { useState, useEffect, useRef } from "react";

export default function useMap({ maps, destinations, location, travelType }) {
  const [mapState, setMapState] = useState({ loading: true });
  const mapRef = useRef();
  const directionsService = new maps.DirectionsService();
  const directionsRenderer = new maps.DirectionsRenderer();
  const split = location.split(", ");
  const currentLocation = {
    lat: parseFloat(split[0]),
    lng: parseFloat(split[1])
  };
  console.log(currentLocation);
  const mapOptions = {
    zoom: 16,
    center: currentLocation
  };
  const initMap = () => {
    console.log(mapOptions);
    const map = new maps.Map(mapRef.current, mapOptions);
    directionsRenderer.setMap(map);
    const mode = travelType === "Walk" ? destinations.walk : destinations.drive;
    console.log("type", mode);
    displayDirections(mode);
    setMapState({ googleMaps: maps, map, loading: false });
  };
  const getDirections = data =>
    new Promise((resolve, reject) => {
      let request = {
        origin: data.origins.toString(),
        destination: data.destinations.toString(),
        travelMode: data.travelMode
      };
      directionsService.route(request, (response, status) => {
        if (status === "OK") {
          resolve(response);
        } else {
          reject(response);
        }
      });
    });
  const displayDirections = async data => {
    const route = await getDirections(destinations.walk);
    directionsRenderer.setDirections(route);
    console.log("did it");
  };
  useEffect(initMap, [location, destinations, travelType]);
  return { mapRef, ...mapState };
}
