import React, { useEffect } from "react";
import BusRouteDetailForm from "./BusRouteDetailForm";
import BusRouteDetailMap from "./BusRouteDetailMap";
import { Row, Col } from "antd";

function BusRouteDetail({
  setRouteDetail,
  routeDetail,
  isModalOpen,
  setIsModalOpen,
  editRouteForm,
  setEditRouteForm,
}) {
  useEffect(() => {
    setRouteDetail(routeDetail);
  }, [routeDetail]);
  return (
    <>
      <div>BusRouteDetail</div>
      <Row>
        <Col span={12}>
          <BusRouteDetailMap
            setRouteDetail={setRouteDetail}
            routeDetail={routeDetail}
          />
        </Col>
        <Col span={12}>
          <BusRouteDetailForm
            setRouteDetail={setRouteDetail}
            routeDetail={routeDetail}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            editRouteForm={editRouteForm}
            setEditRouteForm={setEditRouteForm}
          />
        </Col>
      </Row>
    </>
  );
}

export default BusRouteDetail;
