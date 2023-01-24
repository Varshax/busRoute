import React from "react";
import { Button, Modal, Typography } from "antd";
import { useState } from "react";
import BusRouteForm from "./BusRouteForm";
const BusRouteModal = ({
  isModalOpen,
  setIsModalOpen,
  setRouteDetail,
  routeDetail,
  editRouteForm,
  setEditRouteForm,
  getRoutes,
}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setEditRouteForm(false);
    setIsModalOpen(false);
  };

  console.log(editRouteForm);
  return (
    <>
      <Modal
        className="RouteModal"
        title={
          <Typography>
            {editRouteForm ? "Edit Route Form" : "Create Route Form"}
          </Typography>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <BusRouteForm
          setIsModalOpen={setIsModalOpen}
          setRouteDetail={setRouteDetail}
          routeDetail={routeDetail}
          editRouteForm={editRouteForm}
          setEditRouteForm={setEditRouteForm}
          getRoutes={getRoutes}
        />
      </Modal>
    </>
  );
};
export default BusRouteModal;
