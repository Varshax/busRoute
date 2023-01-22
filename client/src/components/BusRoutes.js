import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;

const BusRoutes = ({ route, getRoutes, setRouteDetail, routeDetail }) => {
  const deleteRoutes = async (id) => {
    await axios
      .delete(`http://localhost:5001/routes/${id}`)
      .then((resp) => {
        if (resp.status === 200) {
          getRoutes();
          console.log("Successfully Deleted");
        }
      })
      .catch((error) => {
        return error;
      });
  };

  return (
    <div>
      <Card
        style={{
          width: 300,
          cursor: "pointer",
        }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <>
            <Link to={`/routes/routeDetail/${route._id}`}>
              <EditOutlined
                onClick={() => {
                  setRouteDetail(route);
                }}
              />
            </Link>
            <DeleteOutlined
              onClick={() => {
                deleteRoutes(route._id);
              }}
            />
          </>,
        ]}
      >
        <Meta
          title={route.routeName}
          description={`This route is ${route.routeStatus} and goes ${route.routeDirection}`}
        />
      </Card>
    </div>
  );
};

export default BusRoutes;
