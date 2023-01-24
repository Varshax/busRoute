import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, { Source, Layer, Marker } from "react-map-gl";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoidmFyc2hpbmlhazI1IiwiYSI6ImNsZDZoMzF3YjA0dXozcHBiaXFqOTdhOXgifQ.kFDv0nM6o01tsZXGqGggvA";

function PolyLine({ routeStops }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.641151);
  const [lat, setLat] = useState(12.971891);
  const [zoom, setZoom] = useState(12);
  const [coordinatesList, setCordinatesList] = useState([
    // [77.641151, 12.971891],
    // [77.6561, 12.9613],
    // [78.4867, 17.385],
  ]);
  const [featuresList, setFeaturesList] = useState([]);

  useEffect(() => {
    if (routeStops) {
      let cords = [];
      routeStops.forEach((i) => {
        cords.push([i.stopLongitude, i.stopLatitude]);
      });
      setCordinatesList(cords);
    }
  }, [routeStops]);

  useEffect(() => {
    if (coordinatesList) {
      let featureList = [];
      coordinatesList.forEach((i) => {
        featureList.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [i[0], i[1]],
          },
        });
      });
      setFeaturesList(featureList);
    }
  }, [coordinatesList]);

  console.log(coordinatesList);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,

      style: "mapbox://styles/mapbox/light-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.current = mapInstance;
    // setTimeout(() => {
    mapInstance.on("load", () => {
      map.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: coordinatesList,
          },
        },
      });
      map.current.addSource("points", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: featuresList,
        },
      });

      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#888",
          "line-width": 5,
        },
      });
      map.current.addLayer({
        id: "points",
        type: "circle",
        source: "points",
        paint: {
          "circle-color": "#0093e5",
          "circle-radius": 20,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });
    });
  });

  return (
    <div className="App">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default PolyLine;
