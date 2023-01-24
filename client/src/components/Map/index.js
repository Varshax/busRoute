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
      style={{
        width: "95%",
        height: "80vh",
        margin: "90px 15px",
        borderRadius: "20px",
      }}
      mapStyle="mapbox://styles/mapbox/light-v11"
    >
      {routeStops && (
        <>
          {routeStops.map((stop) => (
            <Marker
              key={routeStops._id}
              longitude={stop.stopLongitude}
              latitude={stop.stopLatitude}
              anchor="bottom"
            >
              <h2>{stop.stopName}</h2>

              <div className="marker"></div>
            </Marker>
          ))}
        </>
      )}
    </Map>
  );
};

export default GeoMap;
