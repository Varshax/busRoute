import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, { Source, Layer, Marker } from "react-map-gl";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxWorker from "mapbox-gl/dist/mapbox-gl-csp-worker";
mapboxgl.workerClass = MapboxWorker;

mapboxgl.accessToken =
  "pk.eyJ1IjoidmFyc2hpbmlhazI1IiwiYSI6ImNsZDZoMzF3YjA0dXozcHBiaXFqOTdhOXgifQ.kFDv0nM6o01tsZXGqGggvA";

function PolyLine({ routeStops, id }) {
  console.log(routeStops, id, "id - routestops");

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(77.641151);
  const [lat, setLat] = useState(12.971891);
  const [zoom, setZoom] = useState(10);
  const [coordinatesList, setCordinatesList] = useState([]);
  const [featuresList, setFeaturesList] = useState([]);

  useEffect(() => {
    if (routeStops) {
      let cords = [];
      routeStops.forEach((i) => {
        cords.push([i.stopLongitude, i.stopLatitude]);
      });
      setCordinatesList(cords);
    }
  }, [id]);

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
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    mapInstance.on("load", () => {
      mapInstance.addSource(`route`, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: coordinatesList,
          },
        },
      });
      mapInstance.addSource(`points`, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: featuresList,
        },
      });

      mapInstance.addLayer({
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
      mapInstance.addLayer({
        id: "points",
        type: "circle",
        source: "points",
        paint: {
          "circle-color": "#0093e5",
          "circle-radius": 10,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff",
        },
      });
    });

    map.current = mapInstance;
  }, [coordinatesList, featuresList, id, lat, lng, zoom]);

  return (
    <div className="App">
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default PolyLine;
