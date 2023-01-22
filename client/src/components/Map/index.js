import React from "react";
import Map, { Marker } from "react-map-gl";
import { Typography } from "antd";

import "mapbox-gl/dist/mapbox-gl.css";

import "./index.css";

const accessToken =
  "pk.eyJ1IjoidmFyc2hpbmlhazI1IiwiYSI6ImNsZDZoMzF3YjA0dXozcHBiaXFqOTdhOXgifQ.kFDv0nM6o01tsZXGqGggvA";
const GeoMap = ({ routeStops }) => {
  console.log(routeStops);
  return (
    <Map
      mapboxAccessToken={accessToken}
      initialViewState={{
        longitude: 77.5946,
        latitude: 12.9716,
        zoom: 12,
      }}
      style={{ width: "100%", height: "50vh" }}
      mapStyle="mapbox://styles/mapbox/outdoors-v12"
    >
      {routeStops.map((stop) => (
        <Marker
          key={routeStops._id}
          longitude={stop.stopLongitude}
          latitude={stop.stopLatitude}
          anchor="bottom"
        >
          <div className="marker">
            <h1>{stop.stopName}</h1>
          </div>
        </Marker>
      ))}
    </Map>
  );
};

export default GeoMap;
