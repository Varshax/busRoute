import { Button, Form, Input, Select, Row, Col, Typography } from "antd";
import React, { useEffect } from "react";
import BusRouteModal from "./BusRouteModal";

const BusRouteDetailForm = ({
  setRouteDetail,
  routeDetail,
  isModalOpen,
  setIsModalOpen,
  setEditRouteForm,
  editRouteForm,
}) => {
  return (
    <>
      <Row>
        <Col>
          <Button
            onClick={() => {
              setEditRouteForm(true);
              setIsModalOpen(true);
            }}
          >
            Edit Route Details
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>Route Name: {routeDetail.routeName} </Col>
        <Col span={24}> Route Direction: {routeDetail.routeDirection}</Col>
        <Col span={24}>Route Status {routeDetail.routeStatus}</Col>
        {routeDetail && (
          <Col span={24}>
            Route Stops:{" "}
            {routeDetail.routeStops.map((stop) => {
              return (
                <Typography key={stop._id}>
                  <ol>
                    <li>{stop.stopName}</li>
                  </ol>
                </Typography>
              );
            })}
          </Col>
        )}
      </Row>
      <BusRouteModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        setRouteDetail={setRouteDetail}
        routeDetail={routeDetail}
        setEditRouteForm={setEditRouteForm}
        editRouteForm={editRouteForm}
      />
    </>
  );
};

export default BusRouteDetailForm;
