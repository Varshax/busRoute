import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import GeoMap from "../components/Map/index";
import DeckGL from "@deck.gl/react";
import { LineLayer } from "@deck.gl/layers";

const BusRouteDetailMap = ({ setRouteDetail, routeDetail }) => {
  const data = [
    {
      from: {
        name: "19th St. Oakland (19TH)",
        coordinates: [
          routeDetail.routeStops[0].stopLatitude,
          routeDetail.routeStops[0].stopLongitude,
        ],
      },
      to: {
        name: "12th St. Oakland City Center (12TH)",
        coordinates: [
          routeDetail.routeStops[1].stopLatitude,
          routeDetail.routeStops[1].stopLongitude,
        ],
      },
    },
  ];
  const layer = new LineLayer({
    id: "line-layer",
    data,
    pickable: true,
    getWidth: 50,
    getSourcePosition: (data) => data.from.coordinates,
    getTargetPosition: (data) => data.to.coordinates,
    getColor: () => "#fff",
  });

  const initialViewState = {
    longitude: 77.5946,
    latitude: 12.9716,
    zoom: 12,
  };
  return (
    <>
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={layer}
        getTooltip={({ object }) =>
          object && `${object.from.name} to ${object.to.name}`
        }
      >
        <GeoMap routeStops={routeDetail.routeStops} />
      </DeckGL>
    </>
  );
};

export default BusRouteDetailMap;
