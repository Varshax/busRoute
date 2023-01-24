import React from "react";
import { Modal, Typography } from "antd";
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
    setEditRouteForm(false);
    setIsModalOpen(false);
    setRouteDetail([]);
  };
  const handleCancel = () => {
    setEditRouteForm(false);
    setIsModalOpen(false);
    setRouteDetail([]);
    window.location.reload(true);
  };

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
