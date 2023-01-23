import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Card, Collapse, Typography } from "antd";
const { Panel } = Collapse;
const { Meta } = Card;

const BusRoutes = ({ route, getRoutes, setRouteDetail, routeDetail }) => {
  const [expandIconPosition, setExpandIconPosition] = useState("start");
  const onPositionChange = (newExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };
  const onChange = (key) => {
    console.log(key);
  };

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

  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );

  return (
    <div>
      {/* <Card
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
      </Card> */}
      <Collapse
        defaultActiveKey={["1"]}
        onChange={onChange}
        expandIconPosition={expandIconPosition}
      >
        <Panel
          header={
            <>
              <Typography>{route.routeName}</Typography>
              <Typography>
                {" "}
                This route is recently created and will take you to hell for
                sure. So have fun on the way.
              </Typography>
            </>
          }
          key={route._id}
          extra={genExtra()}
        >
          <div>
            This route is recently created and will take you to hell for sure.
            So have fun on the way.
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default BusRoutes;
