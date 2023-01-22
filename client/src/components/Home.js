import React, { useEffect, useState } from "react";
import { Button, Col, Row, Card, Typography } from "antd";
import BusRouteModal from "./BusRouteModal";
import axios from "axios";
import BusRoutes from "./BusRoutes";

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
        <Col span={24}>
          <div className="site-card-border-less-wrapper home-side">
            <Card
              title={
                <>
                  <Typography className="text">Find Routes Easily</Typography>
                </>
              }
              bordered={false}
              className="card"
            ></Card>
          </div>
          <Row>
            <Col>
              <Button
                style={{ margin: "10px 5px" }}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Create New Route
              </Button>
            </Col>
          </Row>
          <div className="">
            <Row gutter={16}>
              {routes &&
                routes.map((route) => {
                  return (
                    <Col>
                      <BusRoutes
                        key={route._id}
                        route={route}
                        getRoutes={getRoutes}
                        setRouteDetail={setRouteDetail}
                        routeDetail={routeDetail}
                      />
                    </Col>
                  );
                })}
            </Row>
          </div>
        </Col>
      </Row>
      <BusRouteModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        setRouteDetail={setRouteDetail}
        routeDetail={routeDetail}
        editRouteForm={editRouteForm}
        setEditRouteForm={setEditRouteForm}
      />
    </>
  );
}

export default Home;
