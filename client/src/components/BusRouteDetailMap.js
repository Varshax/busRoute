import React, { useEffect, useState, useRef } from "react";
import mapboxgl from "mapbox-gl";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import GeoMap from "../components/Map/index";

const BusRouteDetailMap = ({ setRouteDetail, routeDetail }) => {
  console.log(routeDetail);

  return <GeoMap routeStops={routeDetail.routeStops} />;
};

export default BusRouteDetailMap;
