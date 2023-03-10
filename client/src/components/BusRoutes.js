import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Collapse, Typography, Button, message } from "antd";
const { Title } = Typography;
const { Panel } = Collapse;

const BusRoutes = ({
  getRoutes,
  setRouteDetail,
  routes,
  routeDetail,
  setEditRouteForm,
  setIsModalOpen,
}) => {
  const onChange = (key) => {
    setRouteDetail(routes.filter((route) => route._id === key));
  };

  const editRoute = () => {
    setEditRouteForm(true);
    setIsModalOpen(true);
  };
  const deleteRoutes = async (id) => {
    await axios
      .delete(`https://bus-route-varshax.vercel.app/api/v1/${id}`)
      .then((resp) => {
        if (resp.status === 200) {
          getRoutes();
          setTimeout(() => {
            message.success("Deleted Route Successfully");
          });
        }
      })
      .catch((err) => {
        return setTimeout(() => {
          message.error({ err });
        });
      });
  };

  return (
    <Collapse accordion onChange={onChange}>
      {routes &&
        routes.map((route) => {
          return (
            <Panel
              header={
                <>
                  <span
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Title level={3}>{route.routeName}</Title>
                    <div>
                      <span style={{ marginRight: "10px" }}>
                        <Button
                          onClick={editRoute}
                          disabled={routeDetail.length}
                        >
                          <EditOutlined />
                          Edit Route
                        </Button>
                      </span>
                      <span style={{ marginRight: "5px" }}>
                        <DeleteOutlined
                          onClick={() => {
                            deleteRoutes(route._id);
                          }}
                          disabled={routeDetail.length}
                        />
                      </span>
                    </div>
                  </span>
                  <p>
                    This route is recently created and will take you for a ride.
                    So have fun on the way.
                  </p>
                  <div className="routeDetails">
                    {route.routeStatus && route.routeStatus === "true" ? (
                      <span className="active">Active</span>
                    ) : (
                      <span className="inactive">Inactive</span>
                    )}
                    <span className="stops">
                      {route.routeStops.length} Stops
                    </span>
                  </div>
                </>
              }
              key={route._id}
            >
              <div>
                {route.routeStops.map((i) => {
                  return (
                    <div className="stopList">
                      <span className="name">{i.stopName}</span>
                      <span className="lat">Latitude: {i.stopLatitude}</span>
                      <span className="lng">Longitude: {i.stopLongitude}</span>
                    </div>
                  );
                })}
              </div>
            </Panel>
          );
        })}
    </Collapse>
  );
};

export default BusRoutes;
