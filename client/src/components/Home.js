import React, { useEffect, useState } from "react";
import { Button, Col, Row, Card, Typography, Collapse } from "antd";
import BusRouteModal from "./BusRouteModal";
import axios from "axios";
import BusRoutes from "./BusRoutes";
import GeoMap from "../components/Map/index";
import Icon from "../Icon.png";
import { PlusOutlined } from "@ant-design/icons";

function Home({
  setRouteDetail,
  routeDetail,
  isModalOpen,
  setIsModalOpen,
  editRouteForm,
  setEditRouteForm,
}) {
  const [routes, updateRoutes] = useState([]);

  const getRoutes = async () => {
    const data = await axios
      .get("http://localhost:5001/routes")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });
    updateRoutes(data);
  };

  useEffect(() => {
    getRoutes();
  }, []);

  return (
    <>
      <Row>
        <Col span={12}>
          <Row className="mainIcon">
            <img src={Icon} alt="icon" />
          </Row>
          <Row className="mainHeading">
            <Col span={12}>
              <Typography>Find Routes Easily</Typography>
            </Col>
            <Col>
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <span>Create New Route</span>
                {/* <span>
                  <PlusOutlined />
                </span> */}
              </Button>
            </Col>
          </Row>
          <div className="busRouteList">
            <Row>
              <Col span={24}>
                <BusRoutes
                  routes={routes}
                  getRoutes={getRoutes}
                  setRouteDetail={setRouteDetail}
                  routeDetail={routeDetail}
                  setIsModalOpen={setIsModalOpen}
                  setEditRouteForm={setEditRouteForm}
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={12}>
          {routeDetail[0] ? (
            <GeoMap routeStops={routeDetail[0].routeStops} />
          ) : (
            <GeoMap />
          )}
        </Col>
      </Row>
      <BusRouteModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        setRouteDetail={setRouteDetail}
        routeDetail={routeDetail}
        editRouteForm={editRouteForm}
        setEditRouteForm={setEditRouteForm}
        getRoutes={getRoutes}
      />
    </>
  );
}

export default Home;
